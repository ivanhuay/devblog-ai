'use strict';

const getSocialTemplate = (blogPost) => `
# Social Media Share Template

Use this template to create a social media post summarizing your dev blog content. Replace the placeholders in [square brackets] with your specific information.

---

📘 New Blog Post: [Blog Post Title] 📘

Just published my latest tech journey update!

Today's highlights:
* [Key Accomplishment 1]
* [Key Accomplishment 2]
* [Key Accomplishment 3]

Follow my job search prep in real-time: [URL]

#TechJourney #WebDev #OpenToWork [Add any other relevant hashtags]

---

Notes for using this template:
1. Replace [Blog Post Title] with your actual blog post title.
2. Fill in [Key Accomplishment 1], [Key Accomplishment 2], and [Key Accomplishment 3] with your main achievements or activities for the day.
3. Replace [URL] with the actual link to your blog post or profile.
4. Add or modify hashtags as needed to fit your specific focus and target audience.
5. Keep the post concise and impactful, highlighting the most interesting parts of your day.
6. Use emojis strategically to make your post visually appealing and to emphasize key points.

Blog Post Reference:
${blogPost}
`;

module.exports = getSocialTemplate;
