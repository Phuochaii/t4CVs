import React from "react";

function CV() {
  // Dữ liệu giả
  const fakeData = {
    name: "John Doe",
    title: "Software Developer",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Street, City, Country",
    experience: [
      {
        position: "Senior Developer",
        company: "ABC Tech",
        duration: "2018 - Present",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        position: "Junior Developer",
        company: "XYZ Inc.",
        duration: "2016 - 2018",
        description:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University XYZ",
        year: "2012 - 2016",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Tailwind CSS"],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8  border border-gray-300 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{fakeData.name}</h1>
        <p className="text-lg">{fakeData.title}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <p>Email: {fakeData.email}</p>
        <p>Phone: {fakeData.phone}</p>
        <p>Address: {fakeData.address}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Experience</h2>
        {fakeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{exp.position}</h3>
            <p className="text-sm">
              {exp.company} ({exp.duration})
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {fakeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-sm">
              {edu.institution} ({edu.year})
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <ul className="list-disc pl-4">
          {fakeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CV;
