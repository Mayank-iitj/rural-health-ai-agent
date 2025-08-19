This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel 
Here are Testing Instructions you can use for your rural-health-ai-agent repository. This template assumes a Python-based project with a machine learning/AI component. Modify commands/paths as per your actual codebase.

🧪 Testing Instructions (for rural-health-ai-agent)
1. Clone the Repository
bash
git clone https://github.com/Mayank-iitj/rural-health-ai-agent.git
cd rural-health-ai-agent
2. Install Dependencies
Make sure you have Python 3.8+ installed. Then run:

bash
pip install -r requirements.txt
3. Download Model Weights & Sample Data
Pretrained Model Weights:
Download the latest model weights from this link, and save them in the models/ directory.

Sample Data:
Download sample data from this link and save it in the data/ directory.

(If you have provided default weights/sample data in the repo, skip this step.)

4. Run Automated Tests
To verify setup and core functionalities, run:

bash
pytest
or

bash
python -m unittest discover
5. Manual Testing & App Demo
To manually test or demo the application (streamlit example):

bash
streamlit run app.py
Then visit http://localhost:8501 in your browser.

6. Testing API Endpoints (Optional)
If your app exposes API endpoints (e.g., with FastAPI/Flask):

bash
uvicorn app:app --reload
Example POST request:

bash
curl -X POST -F "input=@data/sample_input.json" http://localhost:8000/predict
7. Support
For issues with setup/testing, please open an issue here or contact the maintainer.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
