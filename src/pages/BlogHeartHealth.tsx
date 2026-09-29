import { Helmet } from "react-helmet-async";

const BlogHeartHealth = () => {
  return (
    <>
      <Helmet>
        <title>Heart Health & Prevention | Preventvital</title>
        <meta name="description" content="Learn why heart health starts before symptoms appear, the key numbers to know, everyday prevention habits and warning signs you shouldn't ignore." />
        <meta name="keywords" content="heart health, heart health tips, heart disease prevention, cardiovascular disease prevention, healthy heart, World Heart Day 2026" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
        <article className="prose prose-base md:prose-lg lg:prose-xl mx-auto text-gray-800 w-full overflow-hidden">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a365d] mb-4 tracking-tight leading-tight">
              Heart Health: Why Prevention Starts Before the Problem
            </h1>
            <p className="text-xl text-gray-600 font-medium">World Heart Day 2026 | Don't Miss a Beat</p>
          </header>

          <div className="w-full rounded-2xl shadow-sm mb-12 overflow-hidden border border-gray-100">
            <img 
              src="/images/heart_health_featured.jpg" 
              alt="Hands protecting a human heart for World Heart Day 2026 – Preventvital" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>Your heart works quietly every day—beating continuously, circulating blood and oxygen throughout your body, and supporting everything from movement and exercise to sleep and everyday life.</p>
            <p>Yet many of us think about heart health only when something feels wrong.</p>
            <p className="font-bold text-2xl text-[#1a365d] mt-6">Prevention starts much earlier.</p>
            
            <p>Cardiovascular diseases (CVDs), which include heart disease and stroke, are the leading cause of death globally. The World Health Organization estimates that <strong className="text-gray-900">19.8 million people died from cardiovascular diseases in 2022</strong>, representing approximately 32% of all deaths worldwide. About 85% of these deaths were caused by heart attacks and strokes.</p>
            
            <p>The good news is that many cardiovascular risk factors can be prevented, reduced or managed through healthier lifestyles, early detection and appropriate medical care.</p>
            
            <p>This World Heart Day, the message is simple:</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mt-8 mb-6 pb-4 border-b border-gray-200">
              Don't Miss a Beat.
            </h2>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-10 mb-5">Heart Disease Can Hide in Plain Sight</h2>
            <p>One of the challenges with cardiovascular health is that important risk factors may develop without obvious symptoms.</p>
            <p>High blood pressure, raised blood glucose and unhealthy blood lipid levels can all increase cardiovascular risk. A person can sometimes feel perfectly well while one or more of these risk factors are present.</p>
            <p>That's why regular health checks matter.</p>
            <p>Knowing your blood pressure, blood sugar and cholesterol levels can give you and your healthcare professional a better understanding of your overall health.</p>
            
            <div className="my-6 md:my-8 bg-blue-50/50 p-4 md:p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
              <p className="font-bold text-lg md:text-xl text-blue-900 m-0">Feeling healthy is important. Knowing your health is even better.</p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-10 mb-5">Why Heart Health Matters in India</h2>
            <p>Heart health is particularly important in India, where cardiovascular diseases represent a significant part of the country's health burden.</p>
            <p>WHO India reports that cardiovascular diseases account for a substantial share of deaths in India, while raised blood pressure remains one of the major cardiovascular risk factors. WHO has also highlighted the importance of early detection and effective management of hypertension and diabetes.</p>
            <p>This makes preventive health awareness—not just treatment—an important part of building healthier communities.</p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-12 mb-6">Know the Numbers That Matter</h2>
            <p>Your heart-health picture involves more than one number.</p>
            <p>Depending on your age, health history and individual risk factors, a healthcare professional may recommend monitoring:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500 my-6">
              <li><strong>Blood pressure</strong></li>
              <li><strong>Blood glucose</strong></li>
              <li><strong>Cholesterol and other blood lipids</strong></li>
              <li><strong>Body weight and other measures of healthy weight</strong></li>
              <li><strong>Physical activity</strong></li>
              <li><strong>Tobacco use</strong></li>
              <li><strong>Family and personal health history</strong></li>
            </ul>
            <p>These measurements do not provide a complete picture on their own. But they can help identify risk factors that may otherwise go unnoticed.</p>
            <p>The goal isn't simply to collect health numbers.</p>
            
            <div className="my-6 md:my-8 bg-blue-50/50 p-4 md:p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
              <p className="font-bold text-lg md:text-xl text-blue-900 m-0">The goal is to understand what they mean and take appropriate action.</p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-12 mb-6">6 Everyday Habits That Support Heart Health</h2>
            <p>Heart health isn't built in a single day.</p>
            <p>It is shaped by the habits we repeat over weeks, months and years.</p>
            
            <div className="my-8 w-full rounded-2xl overflow-hidden shadow-sm">
              <img src="/images/active_lifestyle.jpg" alt="People enjoying an active lifestyle by jogging in a park" className="w-full h-auto object-cover" />
            </div>
            
            <div className="space-y-10 mt-8">
              <section>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                  Move More
                </h3>
                <p className="mb-3">Regular physical activity supports cardiovascular health and can help reduce the risk of several chronic conditions.</p>
                <p className="mb-3">For adults, WHO recommends <strong>150–300 minutes of moderate-intensity aerobic physical activity per week</strong>, or <strong>75–150 minutes of vigorous-intensity activity</strong>, or an equivalent combination. Adults should also include muscle-strengthening activities on at least two days each week.</p>
                <p className="mb-3">You don't necessarily need an intense workout to get started.</p>
                <p className="mb-3">Walking, cycling, swimming, dancing, playing sports or simply finding more opportunities to move during the day can all contribute to an active lifestyle.</p>
                <p className="font-semibold text-blue-800 italic">Start where you are. Build gradually. Keep moving.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                  Eat for Your Heart
                </h3>
                <p className="mb-3">A heart-supportive diet doesn't need to be complicated.</p>
                <p className="mb-3">Aim to include more:</p>
                <ul className="list-disc pl-6 space-y-1 marker:text-blue-500 mb-4">
                  <li>Vegetables and fruits</li>
                  <li>Whole grains</li>
                  <li>Beans and other legumes</li>
                  <li>Nuts and seeds</li>
                  <li>Nutritious sources of protein</li>
                  <li>Minimally processed foods</li>
                </ul>
                <p className="mb-3">At the same time, limit excessive amounts of salt, free sugars, saturated fats and highly processed foods.</p>
                <p className="mb-4">WHO recommends that adults consume <strong>less than 5 grams of salt per day</strong>—about one teaspoon in total from all sources.</p>
                <p className="mb-2">Small changes can add up:</p>
                <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100">
                  <p className="font-bold text-lg text-[#1a365d] leading-loose m-0">
                    More whole foods.<br/>
                    Less excess salt.<br/>
                    Less highly processed food.<br/>
                    More variety.
                  </p>
                </div>
                
                <div className="my-6 w-full rounded-xl overflow-hidden shadow-sm">
                  <img src="/images/healthy_habits_food.jpg" alt="A healthy heart-supportive meal with fresh vegetables and whole grains" className="w-full h-auto object-cover" />
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 
                  Avoid Tobacco
                </h3>
                <p className="mb-3">Tobacco use is a major cardiovascular risk factor.</p>
                <p className="mb-3">Smoking damages blood vessels and increases the risk of cardiovascular disease, including heart attack and stroke. Exposure to second-hand smoke can also harm health.</p>
                <p className="mb-3">If you smoke, quitting is an important step toward better cardiovascular health.</p>
                <p>If quitting feels difficult, seek support from a healthcare professional rather than trying to manage it alone.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span> 
                  Know Your Blood Pressure
                </h3>
                <p className="mb-3">High blood pressure is one of the most important modifiable risk factors for cardiovascular disease.</p>
                <p className="mb-3">The challenge is that <strong>high blood pressure often has no obvious symptoms</strong>.</p>
                <p className="mb-3">That's why checking your blood pressure matters.</p>
                <p className="mb-3">If your readings are repeatedly high, speak with a healthcare professional. Diagnosis and treatment should be based on appropriate measurements and clinical assessment—not on a single reading taken in isolation.</p>
                <p className="font-semibold text-blue-800 italic">Don't wait until you feel unwell to know your blood pressure.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span> 
                  Pay Attention to Blood Sugar and Cholesterol
                </h3>
                <p className="mb-3">Blood glucose and blood lipids are important parts of cardiovascular risk assessment.</p>
                <p className="mb-3">Diabetes and unhealthy cholesterol levels can increase cardiovascular risk, particularly when they remain uncontrolled over time.</p>
                <p className="mb-3">If you have been advised to monitor your blood sugar or cholesterol, keep track of your results and follow the recommendations provided by your healthcare professional.</p>
                <p className="mb-3">The goal isn't simply to collect numbers.</p>
                <div className="mt-4 bg-blue-50/50 p-4 md:p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
                  <p className="font-bold text-lg md:text-xl text-blue-900 m-0">The goal is to understand your health and act on it appropriately.</p>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span> 
                  Take Sleep, Stress and Recovery Seriously
                </h3>
                <p className="mb-3">Heart health is connected to your overall lifestyle.</p>
                <p className="mb-3">Sleep, stress, physical activity, nutrition and daily routines can all influence your ability to maintain healthy habits and manage cardiovascular risk factors.</p>
                <p className="mb-3">You don't need to change everything overnight.</p>
                <p className="mb-3">Focus on sustainable improvements.</p>
                <p className="font-semibold text-blue-800 italic">Small actions, repeated consistently, can become meaningful habits.</p>
              </section>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-12 mb-6 pt-8 border-t border-gray-200">Know the Warning Signs</h2>
            <p>Prevention is important, but knowing the warning signs of an acute cardiovascular event is equally important.</p>
            <p>Symptoms of a heart attack can include:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-red-500 my-6">
              <li>Pain or discomfort in the centre of the chest</li>
              <li>Pain or discomfort spreading to the arms, shoulder, jaw or back</li>
              <li>Shortness of breath</li>
              <li>Nausea or vomiting</li>
              <li>Light-headedness or faintness</li>
              <li>Cold sweating</li>
              <li>Pale appearance</li>
            </ul>
            <p>Symptoms can vary between people, and not everyone experiences the same combination of symptoms.</p>
            <p>If you or someone around you develops symptoms that could indicate a heart attack or another medical emergency, <strong className="text-red-600 font-bold">seek emergency medical care immediately.</strong></p>
            <p className="font-semibold text-gray-900">Do not wait for symptoms to become severe.</p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-12 mb-6 pt-8 border-t border-gray-200">Prevention Is a Long-Term Journey</h2>
            <p>There is no single food, workout, health test or technology that can guarantee protection from cardiovascular disease.</p>
            <p>Heart health is influenced by many factors, including age, genetics, existing health conditions, environment and access to healthcare.</p>
            <p>But there are also things we can influence.</p>
            
            <div className="my-8 pl-6 border-l-4 border-indigo-300">
              <p className="font-medium text-gray-800 leading-loose">
                We can understand our health.<br/>
                We can monitor important risk factors.<br/>
                We can move more.<br/>
                We can make healthier food choices.<br/>
                We can avoid tobacco.<br/>
                We can seek medical advice when something doesn't seem right.<br/>
                And we can start before a serious problem forces us to.
              </p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-12 mb-6 pt-8 border-t border-gray-200">Ask a Better Health Question</h2>
            <p>Instead of asking:</p>
            <p className="text-xl font-bold text-gray-400 line-through my-2">"Am I sick?"</p>
            <p>start asking:</p>
            <div className="my-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl text-center shadow-sm border border-blue-100">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 m-0 leading-tight">"How healthy am I—and what can I do to stay healthier?"</p>
            </div>
            <p>That shift—from reactive healthcare to preventive health—is important.</p>
            <p>Prevention isn't about predicting everything that might happen.</p>
            <p>It is about understanding your health today and taking informed steps that may reduce avoidable risks tomorrow.</p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mt-12 mb-6 pt-8 border-t border-gray-200">This World Heart Day, Don't Miss a Beat</h2>
            <p>The World Heart Federation's <strong>2026 World Heart Day campaign continues under the message "Don't Miss a Beat," highlighting the importance of recognizing signs and symptoms of cardiovascular disease and taking action.</strong></p>
            <p>At <strong>Preventvital</strong>, we believe that looking after your health shouldn't begin only when you become sick.</p>
            <p>It should begin with awareness.</p>
            
            <div className="my-10 text-center py-8 border-t border-b border-gray-200">
              <p className="font-bold text-2xl text-[#1a365d] leading-loose">
                Understand your health.<br/>
                Know your risks.<br/>
                Build healthier habits.<br/>
                Take action early.
              </p>
              <h3 className="text-3xl font-black text-blue-600 mt-8 uppercase tracking-wide">Prevention starts before the problem.</h3>
            </div>
            
            <div className="mt-12 mb-16 text-center">
              <h4 className="text-3xl font-extrabold text-[#1a365d]">Preventvital</h4>
              <p className="text-xl italic text-gray-500 mt-2">Live well. Longer.</p>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl text-xs md:text-sm text-gray-600 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2 uppercase tracking-wider text-[10px] md:text-xs">Medical Disclaimer</h4>
              <p className="m-0 leading-relaxed">This article is intended for general health education and awareness. It is not a substitute for medical diagnosis, treatment or personalized medical advice. Health recommendations can vary based on age, medical history, medications and individual risk factors. Consult a qualified healthcare professional for advice specific to your health. If you experience symptoms of a medical emergency, seek immediate emergency medical care.</p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Sources:
              </h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-%28cvds%29?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">WHO — Cardiovascular diseases (CVDs)</a></li>
                <li><a href="https://www.who.int/europe/news-room/fact-sheets/item/physical-activity?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">WHO — Physical activity</a></li>
                <li><a href="https://www.who.int/publications/m/item/healthy-diet-factsheet394?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">WHO — Healthy diet</a></li>
                <li><a href="https://www.who.int/india/health-topics/cardiovascular-diseases?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">WHO India — Cardiovascular diseases</a></li>
                <li><a href="https://world-heart-federation.org/world-heart-day/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">World Heart Federation — World Heart Day 2026</a></li>
              </ul>
            </div>
            
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogHeartHealth;
