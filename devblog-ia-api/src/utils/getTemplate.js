'use strict';

const getTemplate = (rawNotes) => `
# Dev Blog Post Template

Please generate a dev blog post based on the following structure and the raw notes provided below. The blog post should be in a similar style to the example provided, but with unique content based on the raw notes.

## Title
Create a catchy title that summarizes the main theme or accomplishment of the day's activities.

## Day Number: Brief Theme
Provide a short description of the day's focus or main accomplishment.

## Introduction
Write a brief paragraph introducing the day's activities and goals.

## Main Activities
Describe the main activities undertaken during the day. This may include:
- Professional profile updates
- Job search activities
- Personal projects worked on
- Skills developed or improved
- Networking efforts

For each activity, include:
- What was done
- Why it was important
- Any challenges faced
- Outcomes or progress made

## Projects Section (if applicable)
If a specific project was worked on:
- Project name
- Brief description
- Technologies used
- Progress made
- Link to the project (if available)

## Reflections
Include any personal reflections, insights, or lessons learned from the day's activities.

## Next Steps
Outline plans or goals for the next day or near future.

## Day Summary
Provide a bullet-point list summarizing the day's key accomplishments.

## Closing
End with a motivational note or a look ahead to the next part of the journey.

---

Raw Notes:
[${rawNotes}]

---

Please use the above template and raw notes to generate a dev blog post in Markdown format, similar in style and tone to the example provided, but with unique content based on the given information. Don't wrap all in markdown code block.
`;

module.exports = getTemplate;
