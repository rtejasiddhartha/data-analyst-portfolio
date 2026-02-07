// ============================================
// SHARED DATA — Single source of truth
// All content preserved from the latest files
// ============================================

export const projects = [
  {
    id: 'crypto-market-analytics',
    title: 'Live Crypto Market Analytics & AI Insight Platform',
    description: 'Designed and built an end-to-end crypto analytics platform that automates live market data ingestion, transforms it into analytics-ready models, and delivers KPI-driven insights through BI dashboards and AI-assisted narratives.',
    image: '/PROJECT-CRYPTO.png',
    tags: ['Python', 'SQL', 'BigQuery', 'Power BI', 'n8n', 'AI', 'Streamlit', 'Excel'],
    liveDemo: 'https://app.powerbi.com/view?r=eyJrIjoiZDg3MGUyMjQtZjJlZC00MmZmLTk2NTItZTQyOGI5Y2ZjMTcxIiwidCI6IjA0MzJkMmY1LTA0MzUtNGJjMy1iNDBjLThhOTdmZTJkODc2YSJ9&pageName=3e73130aec9e07ad0e26',
    githubRepo: 'https://github.com/rtejasiddhartha/n8n-crypto-live',
    caseStudy: null,
    fullDescription: 'This project implements a production-style crypto analytics pipeline, beginning with automated data ingestion via n8n and public crypto APIs, followed by data validation, cleaning, and feature preparation in Python. Curated, analytics-ready datasets were modeled in BigQuery to support market-wide trend analysis, coin-level performance tracking, dominance metrics, volatility indicators, and rolling time-window comparisons. Interactive Power BI dashboards were designed with slicer-aware logic to ensure accurate insights across single-asset and multi-asset views, enabling clear interpretation of rapidly changing market conditions.',
    aiSummary: 'This project showcases my ability to design automation-first analytics systems that combine data engineering, cloud modeling, BI visualization, and AI-assisted insight generation. It demonstrates how complex, high-velocity market data can be translated into structured KPIs, narrative insights, and decision-ready analytics with controlled AI usage.',
  },
  {
    id: 'customer-churn-analysis',
    title: 'Customer Churn Analytics & Risk Segmentation (SaaS)',
    description: 'Developed an end-to-end churn analytics system to identify at-risk customers and support data-driven retention decisions in a subscription-based business.',
    image: '/PROJECT-CHURN.png',
    tags: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'EDA', 'Excel'],
    liveDemo: 'https://app.powerbi.com/view?r=eyJrIjoiYWEyYzIwYWEtMTQ2Mi00MjUzLWFkMjEtZTQ4MmFkY2IzY2Y3IiwidCI6IjA0MzJkMmY1LTA0MzUtNGJjMy1iNDBjLThhOTdmZTJkODc2YSJ9&pageName=96ef2374c898c7fb3173',
    githubRepo: 'https://github.com/rtejasiddhartha/customer-churn-analysis',
    caseStudy: null,
    fullDescription: 'Built a production-style churn analytics pipeline covering data ingestion, preprocessing, exploratory analysis, and feature engineering for a subscription-based SaaS dataset. Modeled churn using Logistic Regression with explicit class-imbalance handling to preserve recall in a low churn-rate environment. Optimized probability thresholds beyond default cutoffs to balance churn detection with retention capacity. Scored the full customer base and segmented users into Low, Medium, and High churn-risk tiers, translating model outputs into actionable retention strategies such as proactive outreach, targeted offers, and monitoring. Delivered BI-ready datasets optimized for churn KPIs, cohort analysis, and operational dashboards.',
    aiSummary: 'Demonstrates the application of interpretable predictive modeling and risk segmentation to real-world retention problems, emphasizing decision support, recurring-revenue economics, and analytics outputs designed for business consumption.',
  },
  {
    id: 'na-music-retail-analytics',
    title: 'North America Music Retail Analytics (SQL Data Warehouse)',
    description: 'SQL-first analytics platform demonstrating a full OLTP → OLAP data warehouse, star-schema modeling, and business-driven insights for a multi-store music retail operation across the US and Canada.',
    image: '/PROJECT-MUSIC.png',
    tags: ['SQL', 'MySQL', 'OLTP', 'OLAP', 'Business Intelligence'],
    liveDemo: 'https://onedrive.live.com/:p:/g/personal/FC4753770F211A32/IQCgoNoLbq3URqcskedAuMzZAawcTaHHOcbsIowJipkZweQ?resid=FC4753770F211A32!s0bdaa0a0ad6e46d4a72c91e740b8ccd9&ithint=file%2Cpptx&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3AvYy9mYzQ3NTM3NzBmMjExYTMyL0lRQ2dvTm9MYnEzVVJxY3NrZWRBdU16WkFhd2NUYUhIT2Nic0lvd0ppcGtad2VR',
    githubRepo: 'https://github.com/rtejasiddhartha/Music-Retail-Analytics',
    caseStudy: null,
    fullDescription: 'This project simulates a large-scale, digital-first music retail business operating across North America. I designed and implemented a fully normalized OLTP schema and a complementary OLAP analytics layer using star-schema principles. The system models customers, orders, order items, invoices, artists, albums, vendors, stores, and geographic hierarchies. Strong data integrity was enforced using primary and foreign keys, constraints, and triggers. Advanced SQL techniques—including CTEs, window functions, conditional aggregations, and analytical joins—were used to analyze 55K+ orders and 130K+ line items across 4 years of data. The platform generates insights on revenue growth, customer behavior and retention, channel performance, inventory movement, vendor contribution, and artist/album profitability, with SQL serving as the primary analytical engine.',
    aiSummary: 'A production-style SQL analytics system showcasing end-to-end data modeling, OLTP to OLAP design, and business-first analytical problem solving using advanced SQL.',
  },
  {
    id: 'healthcare-wearable-analytics',
    title: 'Healthcare Wearable Data Analytics',
    description: 'Built a wearable health analytics pipeline to identify sleep, activity, and heart-rate risk patterns using Python and Power BI.',
    image: '/PROJECT-HEALTHCARE.png',
    tags: ['Python', 'Data Cleaning', 'Feature Engineering', 'Machine Learning', 'Power BI'],
    liveDemo: '#',
    githubRepo: 'https://github.com/rtejasiddhartha/Wearable-Analytics',
    caseStudy: null,
    fullDescription: 'Designed an end-to-end analytics workflow to transform raw multi-year wearable XML data into structured, analysis-ready datasets using Python. Implemented robust data validation and normalization to handle device sync gaps, irregular sampling intervals, and missing days. Engineered sleep quality features including efficiency, stage distribution, fragmentation, and extreme sleep flags, alongside activity, movement, heart-rate, and HRV-based physiological stress metrics. All features were unified into a longitudinal health timeline to enable trend-based risk detection rather than isolated daily snapshots. A Logistic Regression model was applied to classify elevated health-risk days, with insights delivered through interactive Power BI dashboards for patient-level monitoring and pattern exploration.',
    aiSummary: 'This project showcases my ability to work with noisy real-world wearable data, engineer interpretable health features, and apply predictive modeling to support preventive, risk-focused health analytics.',
  },
];

export const blogPosts = [
  {
    id: 'sql-tips-1',
    title: '5 Essential SQL Tips for Data Analysts',
    date: 'July 15, 2025',
    snippet: 'Mastering these SQL techniques can significantly boost your data analysis efficiency.',
    content: 'SQL is the backbone of data analysis. Here are five tips to help you write cleaner, more efficient queries: 1. Use CTEs for readability. 2. Understand Window Functions. 3. Optimize your JOINs. 4. Index frequently queried columns. 5. Leverage CASE statements for conditional logic. These practices will make your SQL code more robust and maintainable.',
  },
  {
    id: 'powerbi-viz',
    title: 'Creating Impactful Visualizations in Power BI',
    date: 'July 10, 2025',
    snippet: 'Beyond default charts: techniques for truly impactful Power BI dashboards.',
    content: 'Power BI offers a vast array of visualization options. To create impactful dashboards, focus on: 1. Choosing the right chart type for your data. 2. Using consistent color palettes. 3. Minimizing clutter and maximizing data-ink ratio. 4. Incorporating interactive elements like slicers and and drill-throughs. 5. Telling a clear story with your data. Remember, a good visualization simplifies complex information.',
  },
  {
    id: 'ai-trends-2025',
    title: 'AI in Data Analytics: Trends for 2025 and Beyond',
    date: 'July 01, 2025',
    snippet: 'Exploring the future of AI in enhancing data analysis capabilities.',
    content: 'The integration of AI in data analytics is rapidly evolving. Key trends for 2025 include: 1. Automated Machine Learning (AutoML) for faster model deployment. 2. Natural Language Processing (NLP) for unstructured data analysis. 3. Explainable AI (XAI) for transparent model interpretations. 4. Real-time AI for immediate insights. 5. AI-powered data preparation tools. Data analysts who embrace these tools will be at the forefront of innovation.',
  },
];

export const linkedinPosts = [
  {
    id: 'post-1',
    author: 'Teja Siddhartha Rajam',
    profilePic: '/sid-photo.jpg',
    date: '1 hour ago',
    content: 'Just wrapped up a deep dive into customer segmentation using K-Means clustering in Python! The insights on distinct customer behaviors are fascinating. Always amazed by how much value you can extract from seemingly simple data. #DataScience #MachineLearning #CustomerAnalytics',
    likes: 25,
    comments: 5,
  },
  {
    id: 'post-2',
    author: 'Teja Siddhartha Rajam',
    profilePic: '/sid-photo.jpg',
    date: 'Yesterday',
    content: 'SQL tip of the day: Ever struggled with complex aggregations? WINDOW functions are your best friend! ROW_NUMBER(), RANK(), and SUM() OVER (PARTITION BY...) can simplify so much. Game changer for reporting! #SQLTips #DataAnalytics #Database',
    likes: 42,
    comments: 12,
  },
  {
    id: 'post-3',
    author: 'Teja Siddhartha Rajam',
    profilePic: '/sid-photo.jpg',
    date: '3 days ago',
    content: 'Attended an insightful webinar on the ethical implications of AI in data analysis. Bias detection and fairness in algorithms are critical. As data professionals, our responsibility goes beyond just numbers. #AIethics #DataForGood #ResponsibleAI',
    likes: 18,
    comments: 3,
  },
];

export const education = [
  {
    degree: 'PG Diploma - Web Design and Development',
    institution: 'Conestoga College, Ontario, Canada',
  },
  {
    degree: 'B.Tech - Computer Science and Engineering',
    institution: 'Siddhartha Academy of Higher Education, Vijayawada, India',
  },
];

export const certifications = [
  {
    name: 'Power BI Essential Training',
    issuer: 'LinkedIn Learning',
    link: 'https://www.linkedin.com/learning/certificates/905824feb9462f5c5d77ca145f54245a43e26880018885ab21c3a95f3899b210',
  },
  {
    name: 'Python for Data Science, AI & Development',
    issuer: 'IBM (Coursera)',
    link: 'https://www.coursera.org/account/accomplishments/verify/TN6I3VEPTUBI',
  },
  {
    name: 'SQL (Basic) Certificate',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/ef19a7334495',
  },
  {
    name: 'Python (Basic) Certificate',
    issuer: 'HackerRank',
    link: 'https://www.hackerrank.com/certificates/17598ad277b2',
  },
  {
    name: 'Gemini Proficiency',
    issuer: 'Google',
    link: 'https://edu.google.accredible.com/732b8717-f185-4c21-9124-09fb798839f5',
  },
  {
    name: 'AI Skills Passport',
    issuer: 'EY – Microsoft',
    link: '/Certificate_Ey-Microsoft.pdf',
  },
];
