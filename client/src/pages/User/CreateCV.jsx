import React, { Component } from "react";
import CV from "react-cv";

function CreateCV() {
  return (
    <CV
      personalData={{
        name: "S. Berkay Aydin",
        title: "Senior Software Developer",
        image: "https://picsum.photos/200",
        contacts: [
          { type: "email", value: "john@example.com" },
          { type: "phone", value: "+00 (123) 456 78 90" },
          { type: "location", value: "New York" },
          { type: "website", value: "example.com" },
          { type: "linkedin", value: "linkedin.com/in/sbaydin" },
          { type: "twitter", value: "twitter.com/sbayd" },
          { type: "github", value: "github.com/sbayd" },
        ],
      }}
      sections={[
        {
          type: "text",
          title: "Career Profile",
          content: `When I was a child, I always wanted to be a developer..then this hapened **You can use markdown here**`,
          icon: "usertie",
        },
      ]}
      branding={true}
    />
  );
}

export default CreateCV;
