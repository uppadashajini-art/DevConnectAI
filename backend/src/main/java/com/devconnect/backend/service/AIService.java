package com.devconnect.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class AIService {

    private final WebClient webClient;
    private final ObjectMapper mapper;

    @Value("${gemini.api.key}")
    private String apiKey;


    public AIService(WebClient webClient, ObjectMapper mapper) {
        this.webClient = webClient;
        this.mapper = mapper;
    }


    public String generateTasks(String projectDescription) {

        try {

            String prompt = """
                    You are a software project planner.

                    Break the following project into 8-10 development tasks.

                    Return ONLY the task list.
                    One task per line.

                    Project:
                    """ + projectDescription;


            // Create Gemini JSON request

            ObjectNode request = mapper.createObjectNode();

            ArrayNode contents = request.putArray("contents");

            ObjectNode content = contents.addObject();

            ArrayNode parts = content.putArray("parts");

            parts.addObject()
                    .put("text", prompt);



            if (apiKey == null || apiKey.isBlank()) {

                return "Gemini API key is missing.";
            }



            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                            + apiKey;



            System.out.println("Calling Gemini API...");



            String response = webClient.post()

                    .uri(url)

                    .contentType(MediaType.APPLICATION_JSON)

                    .bodyValue(request.toString())

                    .retrieve()

                    .bodyToMono(String.class)

                    .block();



            System.out.println("Gemini Response:");
            System.out.println(response);



            JsonNode root = mapper.readTree(response);



            // Check candidates

            JsonNode candidates = root.get("candidates");


            if (candidates == null || candidates.isEmpty()) {

                return "Gemini returned no candidates.\n\n"
                        + response;
            }



            JsonNode contentNode =
                    candidates.get(0).get("content");


            if (contentNode == null) {

                return "Gemini content missing.\n\n"
                        + response;
            }



            JsonNode partsNode =
                    contentNode.get("parts");


            if (partsNode == null || partsNode.isEmpty()) {

                return "Gemini text missing.\n\n"
                        + response;
            }



            JsonNode textNode =
                    partsNode.get(0).get("text");


            if (textNode == null) {

                return "Gemini returned empty text.\n\n"
                        + response;
            }



            return textNode.asText();



        }
        catch (WebClientResponseException e) {


            System.out.println("Gemini API Error");
            System.out.println("Status : " + e.getStatusCode());
            System.out.println("Body   : " + e.getResponseBodyAsString());


            return "Gemini Error:\n"
                    + e.getResponseBodyAsString();


        }
        catch (Exception e) {


            e.printStackTrace();

            return "Error: "
                    + e.getMessage();
        }
    }
}