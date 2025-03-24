"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

/**
 * Interface defining the props for the ConferenceCard component
 * @interface ConferenceCardProps
 */
export interface ConferenceCardProps {
  /** Title of the press conference */
  title: string;
  /** Date when the press conference was held */
  date: string;
  /** Time when the press conference took place */
  time: string;
  /** Location where the press conference was held */
  location: string;
  /** Full text transcription of the press conference */
  transcription: string;
}

/**
 * ConferenceCard Component
 * 
 * Displays information about a press conference including metadata and transcription.
 * Provides functionality to summarize the transcription using AI.
 * 
 * @component
 * @param {ConferenceCardProps} props - The component props
 * @param {string} props.title - Title of the press conference
 * @param {string} props.date - Date of the press conference
 * @param {string} props.time - Time of the press conference
 * @param {string} props.location - Location where the conference was held
 * @param {string} props.transcription - Full text transcription of the conference
 * @returns {React.ReactElement} Rendered card component with conference details
 */
const ConferenceCard = ({
  title,
  date,
  time,
  location,
  transcription,
}: ConferenceCardProps) => {
  return (
    <Card>
      {/* Header section containing conference metadata */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Date: {date}</CardDescription>
        <CardDescription>Time: {time}</CardDescription>
        <CardDescription>Location: {location}</CardDescription>
      </CardHeader>
      
      {/* Main content section displaying the transcription */}
      <CardContent>
        <CardTitle className="pb-3">Transcription</CardTitle>
        <CardDescription>{transcription}</CardDescription>
      </CardContent>

      {/* Footer section with AI summarization button */}
      <CardFooter>
        {/* 
          TODO: Implement click handler to call AI summarization API
          This button should trigger an API call to summarize the transcription
          using Azure OpenAI's GPT-4o model or similar service
        */}
        <Button variant="default">Summarize with AI</Button>
      </CardFooter>
    </Card>
  );
};

export default ConferenceCard;
