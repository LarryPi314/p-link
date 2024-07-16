from typing import List

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_google_genai import GoogleGenerativeAI
from langchain_community.embeddings import OpenAIEmbeddings

from pinecone import Pinecone, ServerlessSpec

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask.helpers import make_response
from flask import abort


from getpass import getpass

from supabase import create_client, Client

import os
import json

from openai import OpenAI

load_dotenv(dotenv_path='.env.local')

# Initialize the Supabase client
url = os.eviron['SUPABASE_URL']
key = os.eviron['SUPABASE_API_KEY']
supabase: Client = create_client(url, key)

# Initialize Pinecone
key = os.environ['PINECONE_API_KEY']
pc = Pinecone(api_key=key)
index = pc.Index("plink")

key = os.environ["GEMINI_API_KEY"]

llm = GoogleGenerativeAI(model="models/gemini-1.5-pro-latest", google_api_key=key)

# Define your desired data structure.
class format_instr(BaseModel):
    role: str = Field(
        description="role based on the query. if not available, output 'not_avaiable'"
    )
    major: str = Field(
        description="major based on the query. if not available, output 'not_available'"
    )
    location: str = Field(
        description="location  based on the query, if not available, output 'not_avaiable'"
    )
    school: str = Field(
        description="school based on the query. The output should be one of the following: 'Harvey Mudd College', 'Pomona College', 'Scripps College', 'Pitzer College', 'Claremont McKenna College'. if not available, output 'not_available'. "
    )
    class_year: str = Field(
        description="class year based on the query. if not available, output 'not_available'"
    )


# Set up a parser + inject instructions into the prompt template.
parser = JsonOutputParser(pydantic_object=format_instr)

prompt = PromptTemplate(
    template="Transform the user's query: \n{query} into the following format: \n{format_instructions}\n If the field is not available, just provide the string is 'not_available'",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

chain = prompt | llm | parser



app = Flask(__name__)
CORS(app)


@app.route("/process_text", methods=["POST"])
def process_text():
    # protect route
    user_token = ""
    if request.method == "POST":
        headers = request.headers
        bearer = headers.get("Authorization")
        user_token = bearer.split()[1]
        print(f"testing user_token: {user_token}")

    try:
        data = supabase.auth.get_user(user_token)
        data = data.user
    except:
        abort(403)

    # format input to JSON
    user_query = request.args.get("query")
    return chain.invoke({"query": user_query})


import json


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

# This route takes a user's natural language and uses a LLM to extract
# a structured JSON object that can be used to query the Pinecone index
@app.route("/query_user", methods=["POST", "OPTIONS"])
def query_user():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    elif request.method == "POST":
        if request.is_json:
            data = (
                request.get_json()
            )  # Ensure that the content type is application/json
            user_query = data.get("query")

        data = request.get_json()  # This is how you extract JSON data
        user_query = data.get("query")  # Safely get the 'query' field
      
        jsoned_query = chain.invoke({"query": user_query})

        str_data = ""
        if jsoned_query["major"] != "not_available":
            str_data += jsoned_query["major"] + " "
        if jsoned_query["school"] != "not_available":
            str_data += jsoned_query["school"] + " "
        if jsoned_query["role"] != "not_available":
            str_data += jsoned_query["role"] + " "
        if jsoned_query["location"] != "not_available":
            str_data += jsoned_query["location"]
        if jsoned_query["class_year"] != "not_available":
            str_data += jsoned_query["class_year"]

        key = os.eviron['OPENAI_API_KEY']
        client = OpenAI(
            api_key=key,  # this is also the default, it can be omitted
        )

        embeddings = (
            client.embeddings.create(input=str_data, model="text-embedding-3-small")
            .data[0]
            .embedding
        )
        
        # Supplement vector search with a manual filter based on the query
        filter = {}
        if jsoned_query["school"] != "not_available":
            filter["school"] = jsoned_query["school"]

        if jsoned_query["class_year"] != "not_available":
            filter["graduating_year"] = jsoned_query["class_year"]

        # now query
        results = index.query(
            vector=embeddings,
            filter=filter,
            top_k=50,
            include_metadata=True,
        )

        # print(results)
        profiles = []
        for match in results["matches"]:
            profiles.append(match.metadata)

        profiles = {"profiles": profiles}
        # print(jsonify(profiles))
        # print(type(jsonify(profiles)))
        return jsonify(profiles)
    else:
        return "Unsupported Media Type", 415


# This endpoint creates a message using the user's information and the alumni's information
@app.route("/message", methods=["POST"])
def create_message():

    user_data = (
        supabase.table("users")
        .select("*")
        .eq("auth_id", "55ff4749-14d5-4719-8083-1cbc4d55f98b")
        .execute()
    )
    user_data = user_data.data[0]
    print(user_data)

    # generate message
    user_name = user_data["name"]
    user_major = user_data["major"]
    user_college = user_data["school"]
    grad_year = user_data["grad_year"]
    desired_pos = json.dumps(user_data["desired_positions"])

    alumni_info = request.json
    alum_name = alumni_info["first_name"] + " " + alumni_info["last_name"]
    alum_school = alumni_info["school"]
    alum_position = alumni_info["position"]
    alum_company = alumni_info["company"]
    alum_major = alumni_info["major"]
    grad_year = alumni_info["graduationYear"]
    alum_field = alum_position + " at " + alum_company

    print(
        f"my name: {user_name}, my major: {user_major}, my college: {user_college}, my year: {grad_year} \
          my_pos: {desired_pos}"
    )
    message = f"My name is {user_name} and I’m a {user_major} major at {user_college}, trying to reach out to {alum_name} who is a {alum_school} alumni and is currently working as {alum_field}. Craft a nice message matching our background asking for a coffee chat using only the provided information."

    api_key = "AIzaSyDyMThYqlk5t9cg3jq77Hiiprl-bJRFpyQ"

    llm = GoogleGenerativeAI(model="models/gemini-1.0-pro", google_api_key=api_key)

    prompt = PromptTemplate(
        template=message,
        input_variables=[],
        partial_variables={},
    )

    chain = prompt | llm

    response = chain.invoke({})
    response = {"response": response}
    print(response)
    return jsonify(response)

# CRUD functionality

@app.route("/users/create_user", methods=["POST"])
def create_user():
    data = request.json
    # Insert user data into Supabase
    response = supabase.table("users").insert(data).execute()
    if response["status"] == 201:
        return jsonify(response["data"]), 201
    else:
        return jsonify({"error": "Failed to create user"}), 500


@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    # Get user by ID from Supabase
    response = supabase.table("users").select().eq("id", user_id).execute()
    if response["status"] == 200 and response["data"]:
        return jsonify(response["data"][0])
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json
    # Update user by ID in Supabase
    response = supabase.table("users").update(data).eq("id", user_id).execute()
    if response["status"] == 200:
        return jsonify(response["data"][0])
    else:
        return jsonify({"error": "Failed to update user"}), 500


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    # Delete user by ID from Supabase
    response = supabase.table("users").delete().eq("id", user_id).execute()
    if response["status"] == 200:
        return jsonify({"message": "User deleted"})
    else:
        return jsonify({"error": "Failed to delete user"}), 500

if __name__ == "__main__":
    app.run(debug=True)
