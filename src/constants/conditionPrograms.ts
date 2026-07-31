// Single source of truth for the marketing-site "condition-specific program" cards
// and detail pages (homepage ConditionCards, FeaturedPrograms, /disease-prevention-programs,
// and the per-program detail page at /disease-prevention-programs/:id).
// Keep this the only place these six programs are described so the copy can't drift again.

export interface ProgramPhase {
    phase: string;
    title: string;
    focus: string;
}

export interface ProgramFaq {
    question: string;
    answer: string;
}

export interface ProgramInstructor {
    name: string;
    title: string;
    photo: string;
}

export interface ConditionProgram {
    id: string;
    title: string;
    tagline: string;
    description: string;
    overview: string;
    riskFactors: string[];
    duration: string;
    includes: string[];
    outcomeFocus: string;
    whoItsFor: string[];
    curriculum: ProgramPhase[];
    faqs: ProgramFaq[];
    image: string;
    alt: string;
    /** Illustrative program lead shown on the marketing cards — placeholder
     * bio/photo for design purposes; swap for a real staff profile before launch. */
    instructor?: ProgramInstructor;
}

export const conditionPrograms: ConditionProgram[] = [
    {
        id: 'diabetes',
        title: 'Diabetes Prevention',
        tagline: 'Prevent and manage Type 2 diabetes through AI-guided monitoring and lifestyle change.',
        description: 'AI-powered glucose monitoring and lifestyle intervention programs to prevent Type 2 diabetes.',
        overview: 'This program combines continuous glucose awareness with structured yoga, meditation, and nutrition coaching to help you build the daily habits that keep blood sugar in a healthy range. It’s designed for people who are pre-diabetic, have a family history of diabetes, or want to prevent the condition before it starts — pairing evidence-based lifestyle intervention with the tracking tools to see whether it’s working.',
        riskFactors: ['Family History', 'Obesity', 'Sedentary Lifestyle'],
        duration: '12 weeks',
        includes: ['Yoga', 'Meditation', 'Nutrition', 'Breathwork'],
        outcomeFocus: 'Stabilize blood sugar and build sustainable daily habits.',
        whoItsFor: [
            'You have a family history of Type 2 diabetes',
            'Recent bloodwork shows borderline or pre-diabetic glucose levels',
            'You have a sedentary lifestyle or higher BMI',
            'You want a structured, lifestyle-first approach before considering medication',
        ],
        curriculum: [
            { phase: 'Weeks 1-4', title: 'Foundation & Monitoring', focus: 'Establish a glucose monitoring routine, begin gentle yoga and breathwork, and complete a full nutrition assessment.' },
            { phase: 'Weeks 5-8', title: 'Building Habits', focus: 'Move into structured meal planning, increase activity levels, and introduce stress-reduction practices that affect blood sugar.' },
            { phase: 'Weeks 9-12', title: 'Sustaining Results', focus: 'Reinforce habits, review progress against your baseline, and set a long-term maintenance plan.' },
        ],
        faqs: [
            { question: 'Do I need a glucometer to join?', answer: 'It helps but isn’t required to start — we’ll guide you on tracking options, including connecting a compatible wearable if you have one.' },
            { question: 'Can I do this program alongside diabetes medication?', answer: 'Yes, this program is designed to complement medical care, not replace it. Always check with your doctor before changing your medication routine.' },
            { question: 'What happens after the 12 weeks?', answer: 'You’ll retake your CVITAL assessment to see how your risk profile has changed, and can choose a maintenance plan or move to a different program.' },
        ],
        image: 'https://images.unsplash.com/photo-1685660375327-47bcca398780',
        alt: 'Blood glucose meter with test strips on wooden table showing diabetes monitoring equipment',
        instructor: {
            name: 'Ananya Iyer',
            title: 'Certified Diabetes Educator',
            photo: 'https://images.unsplash.com/photo-1767607740661-05e668190cdc?auto=format&fit=crop&w=200&h=200&q=80',
        },
    },
    {
        id: 'hypertension',
        title: 'Hypertension Management',
        tagline: 'Bring blood pressure into a healthy range through monitoring, stress reduction, and guided movement.',
        description: 'Continuous blood pressure monitoring with personalized stress reduction and dietary guidance.',
        overview: 'Hypertension often develops silently, driven by stress, diet, and inactivity. This program pairs regular blood pressure monitoring with structured breathwork, meditation, and physiotherapy to address the lifestyle factors that keep BP elevated — so you can reduce your cardiovascular risk and, where appropriate, your reliance on medication.',
        riskFactors: ['High Sodium', 'Stress', 'Age'],
        duration: '10 weeks',
        includes: ['Meditation', 'Breathwork', 'Physiotherapy', 'Yoga'],
        outcomeFocus: 'Bring blood pressure into a healthy range and reduce reliance on medication.',
        whoItsFor: [
            'You’ve been diagnosed with or are borderline for high blood pressure',
            'You have a high-stress job or lifestyle',
            'You have a family history of hypertension or stroke',
            'You want to manage blood pressure through lifestyle change alongside any prescribed treatment',
        ],
        curriculum: [
            { phase: 'Weeks 1-3', title: 'Baseline & Awareness', focus: 'Set up a consistent BP monitoring routine and begin introductory breathwork and meditation sessions.' },
            { phase: 'Weeks 4-7', title: 'Active Management', focus: 'Add guided physiotherapy, sodium-conscious meal planning, and structured stress-management routines.' },
            { phase: 'Weeks 8-10', title: 'Stabilization', focus: 'Reinforce daily routines, review your BP trend against baseline, and plan for long-term control.' },
        ],
        faqs: [
            { question: 'Will this replace my blood pressure medication?', answer: 'No — this program is designed to work alongside medical treatment. Any changes to medication should be made with your doctor, not based on program progress alone.' },
            { question: 'How often do I need to check my blood pressure?', answer: 'We’ll set up a daily or near-daily monitoring routine so you and your care team can see real trends, not one-off readings.' },
            { question: 'Is this suitable if I’ve just been diagnosed?', answer: 'Yes — many participants join shortly after diagnosis to build lifestyle habits early, alongside whatever treatment their doctor has prescribed.' },
        ],
        image: 'https://images.unsplash.com/photo-1623658045230-605cb00c80d6',
        alt: 'Digital blood pressure monitor displaying readings with stethoscope on medical examination table',
        instructor: {
            name: 'Dr. Sanjay Mehta',
            title: 'Cardiologist',
            photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&h=200&q=80',
        },
    },
    {
        id: 'cardiac',
        title: 'Cardiac Health',
        tagline: 'Advanced heart health monitoring and cardiac rehab-style conditioning to lower cardiovascular risk.',
        description: 'Advanced heart health monitoring with ECG integration and cardiovascular risk assessment.',
        overview: 'Built for people with elevated cardiovascular risk — from high cholesterol to a family history of heart disease — this program combines ECG-informed monitoring with cardiac rehab exercises, breathwork, and nutrition guidance. It’s grounded in the same ACC/AHA risk framework behind your CVITAL score, so progress is measured against a real clinical baseline, not just how you feel.',
        riskFactors: ['Cholesterol', 'Smoking', 'Inactivity'],
        duration: '12 weeks',
        includes: ['Cardiac Rehab', 'Breathwork', 'Physiotherapy', 'Nutrition'],
        outcomeFocus: 'Lower ASCVD risk and strengthen cardiovascular fitness under clinical guidance.',
        whoItsFor: [
            'Your CVITAL assessment flagged an elevated ASCVD risk score',
            'You have high cholesterol, smoke, or have a sedentary lifestyle',
            'You have a family history of cardiac events',
            'You’re recovering from a cardiac event and have been cleared by your doctor for guided activity',
        ],
        curriculum: [
            { phase: 'Weeks 1-4', title: 'Risk Assessment & Rehab Basics', focus: 'Establish an ECG-informed baseline, begin gentle cardiac rehab exercises, and get personalized nutrition guidance.' },
            { phase: 'Weeks 5-8', title: 'Building Cardiovascular Fitness', focus: 'Progress physiotherapy intensity, add breathwork for recovery, and continue regular monitoring.' },
            { phase: 'Weeks 9-12', title: 'Long-Term Heart Health', focus: 'Consolidate habits, reassess your ASCVD risk, and build a maintenance plan for ongoing heart health.' },
        ],
        faqs: [
            { question: 'Is this safe if I’ve had a cardiac event?', answer: 'This program only begins guided physical activity once you’ve been medically cleared by your doctor. We recommend sharing your discharge notes with our team before starting.' },
            { question: 'Do I need an ECG device at home?', answer: 'No — ECG integration uses data from a connected wearable or your latest clinical reports where available; it isn’t required to begin the program.' },
            { question: 'How is this different from the Diabetes or Weight programs?', answer: 'This program is built specifically around your ASCVD risk factors — cholesterol, smoking, inactivity — using the same clinical framework as your CVITAL cardiovascular risk score.' },
        ],
        image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80',
        alt: 'Cardiologist with a stethoscope, arms crossed, ready for a patient consultation',
        instructor: {
            name: 'Dr. Ritu Malhotra',
            title: 'Interventional Cardiologist',
            photo: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?auto=format&fit=crop&w=200&h=200&q=80',
        },
    },
    {
        id: 'respiratory',
        title: 'Respiratory Wellness',
        tagline: 'Breathwork-led therapy to improve lung health and reduce respiratory flare-ups.',
        description: 'Breathwork therapy combined with air quality monitoring for optimal lung health.',
        overview: 'Designed for people affected by pollution, allergies, or a history of smoking, this program uses structured pranayama and breathwork, paired with physiotherapy, to improve lung capacity and reduce the frequency of respiratory discomfort. It’s a shorter, focused program built around a skill you practice daily — your breath.',
        riskFactors: ['Pollution', 'Allergies', 'Smoking'],
        duration: '8 weeks',
        includes: ['Pranayama', 'Breathwork', 'Physiotherapy'],
        outcomeFocus: 'Improve lung capacity and reduce respiratory flare-ups.',
        whoItsFor: [
            'You live in a high-pollution area',
            'You have mild asthma, allergies, or frequent respiratory discomfort',
            'You have a history of smoking',
            'You want to build a structured breathing practice to support lung health',
        ],
        curriculum: [
            { phase: 'Weeks 1-3', title: 'Breath Foundations', focus: 'Learn pranayama basics, establish a lung capacity baseline, and identify your personal respiratory triggers.' },
            { phase: 'Weeks 4-6', title: 'Building Capacity', focus: 'Progress to more advanced breathwork, add physiotherapy for lung function, and build environmental awareness.' },
            { phase: 'Weeks 7-8', title: 'Maintenance', focus: 'Reinforce your routine, track symptoms over time, and set up a long-term breathing practice.' },
        ],
        faqs: [
            { question: 'Is this a substitute for asthma medication or an inhaler?', answer: 'No — this program supports lung health through breathwork and lifestyle changes. Keep using any prescribed medication and talk to your doctor about your respiratory condition.' },
            { question: 'Do I need to already know yoga or pranayama?', answer: 'No prior experience is needed — the program starts with fundamentals and builds up.' },
            { question: 'Can I do this if I have a diagnosed lung condition?', answer: 'Check with your doctor first — the program can complement treatment for many conditions, but your doctor knows your specific case best.' },
        ],
        image: 'https://images.unsplash.com/photo-1665214057620-27d1d10f6203?auto=format&fit=crop&w=900&q=80',
        alt: 'Person practicing an advanced yoga pose to build strength and lung capacity',
        instructor: {
            name: 'Kavita Desai',
            title: 'Pranayama & Breathwork Coach',
            photo: 'https://images.unsplash.com/photo-1496813146940-1601b02f81a4?auto=format&fit=crop&w=200&h=200&q=80',
        },
    },
    {
        id: 'mental',
        title: 'Mental Health & Stress Management',
        tagline: 'Meditation, mindfulness, and mood tracking to build a calmer, more resilient daily routine.',
        description: 'Meditation, mindfulness, and AI-driven mood tracking for emotional wellness.',
        overview: 'Chronic stress shows up in blood pressure, sleep, and long-term cardiovascular risk — not just mood. This program combines guided meditation, breathwork, and yoga with AI-driven mood tracking to help you understand your stress patterns and build a sustainable mindfulness practice around them.',
        riskFactors: ['Stress', 'Sleep Issues', 'Isolation'],
        duration: '8 weeks',
        includes: ['Meditation', 'Breathwork', 'Yoga'],
        outcomeFocus: 'Lower day-to-day stress load and build a consistent mindfulness practice.',
        whoItsFor: [
            'You’re dealing with chronic stress or anxiety',
            'You have ongoing sleep difficulties',
            'You’re feeling isolated or emotionally overwhelmed',
            'You want a structured, trackable mindfulness practice rather than a one-off relaxation app',
        ],
        curriculum: [
            { phase: 'Weeks 1-3', title: 'Grounding', focus: 'Learn mindfulness fundamentals, review sleep hygiene, and start with short guided breathwork sessions.' },
            { phase: 'Weeks 4-6', title: 'Building Resilience', focus: 'Move to structured meditation practice, guided yoga, and stress-response training.' },
            { phase: 'Weeks 7-8', title: 'Integration', focus: 'Fold the practice into your daily routine and build a plan for staying consistent afterward.' },
        ],
        faqs: [
            { question: 'Is this a replacement for therapy or counselling?', answer: 'No — this program builds daily mindfulness and stress-management habits. If you’re experiencing a mental health crisis or need clinical support, please speak with a licensed mental health professional.' },
            { question: 'How does the mood tracking work?', answer: 'You’ll do brief daily check-ins that feed into your progress view, helping you see patterns in stress and mood over time.' },
            { question: 'Can I join if I’m already in therapy?', answer: 'Yes — many participants use this program alongside therapy or counselling as a daily practice between sessions.' },
        ],
        image: 'https://images.unsplash.com/photo-1667890785988-8da12fd0989b?auto=format&fit=crop&w=900&q=80',
        alt: 'Woman sitting cross-legged in quiet meditation',
        instructor: {
            name: 'Anjali Rao',
            title: 'Mindfulness Coach',
            photo: 'https://images.unsplash.com/photo-1463335361701-e90f4c5045d0?auto=format&fit=crop&w=200&h=200&q=80',
        },
    },
    {
        id: 'weight',
        title: 'Weight Management',
        tagline: 'A holistic, metabolic-first approach to sustainable weight loss.',
        description: 'Holistic approach combining nutrition, exercise, and behavioral therapy for sustainable results.',
        overview: 'Rather than a calorie-restriction crash plan, this program combines a metabolic assessment with structured nutrition, progressive exercise, and behavioral coaching. The goal is a pace of change you can sustain — addressing the habits and metabolic factors behind weight gain, not just the number on the scale.',
        riskFactors: ['Poor Diet', 'Inactivity', 'Metabolism'],
        duration: '16 weeks',
        includes: ['Yoga', 'Nutrition', 'Physiotherapy'],
        outcomeFocus: 'Achieve sustainable weight loss through metabolic and behavioral change, not crash dieting.',
        whoItsFor: [
            'You’ve struggled to maintain weight loss with crash diets',
            'You have a sedentary lifestyle',
            'You have related metabolic risk factors, like pre-diabetes or high cholesterol',
            'You want a structured plan with nutrition, exercise, and behavioral support together',
        ],
        curriculum: [
            { phase: 'Weeks 1-4', title: 'Assessment & Reset', focus: 'Complete a metabolic baseline and nutrition audit, and ease into movement with gentle, structured activity.' },
            { phase: 'Weeks 5-10', title: 'Active Change', focus: 'Progress your exercise plan, follow structured meal planning, and work through behavioral coaching sessions.' },
            { phase: 'Weeks 11-16', title: 'Sustainable Habits', focus: 'Reinforce new habits, plan for plateaus, and set a long-term maintenance plan beyond the program.' },
        ],
        faqs: [
            { question: 'Is this a diet plan?', answer: 'It includes structured nutrition guidance, but the program is built around sustainable habits — exercise, behavior, and metabolic health — not short-term calorie restriction.' },
            { question: 'How much weight will I lose?', answer: 'This varies by person and isn’t something we can promise — the program focuses on sustainable metabolic and behavioral change rather than a fixed target.' },
            { question: 'Can I combine this with a specific diet I already follow?', answer: 'Yes — nutrition guidance is personalized around your preferences and any dietary requirements you already have.' },
        ],
        image: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef0?auto=format&fit=crop&w=900&q=80',
        alt: 'Woman practicing a strength-focused yoga pose as part of a fitness routine',
        instructor: {
            name: 'Karan Bhatt',
            title: 'Fitness & Nutrition Coach',
            photo: 'https://images.unsplash.com/photo-1774437678715-fb40846dc252?auto=format&fit=crop&w=200&h=200&q=80',
        },
    },
];
