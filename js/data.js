// ─────────────────────────────────────────────
//  Healyis – All Site Data
// ─────────────────────────────────────────────

const POSTS = [
  {
    id: "hypertension",
    title: "Hypertension: The Silent Killer",
    subtitle: "Understanding high blood pressure before it strikes",
    date: "2026-04-04",
    author: { name: "Dr. Sarah Mitchell", credentials: "MD, Cardiologist", avatar: "SM" },
    category: "Cardiology",
    tags: ["heart", "blood pressure", "cardiovascular", "chronic"],
    readTime: "9 min",
    featured: true,
    heroColor: "linear-gradient(135deg,#0d4f6c 0%,#00b4d8 100%)",
    heroIcon: `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,.9)" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    quickFacts: {
      symptoms: ["Often no symptoms (silent)", "Severe headaches", "Dizziness", "Blurred vision", "Chest pain", "Shortness of breath"],
      riskFactors: ["Obesity / overweight", "High-sodium diet", "Physical inactivity", "Heavy alcohol use", "Family history", "Chronic stress", "Age > 55", "Smoking"],
      whenToSeeDoctor: "BP consistently ≥ 130/80 mmHg, or any reading above 180/120 mmHg (hypertensive crisis — seek emergency care immediately)."
    },
    content: `
      <h2>What Is Hypertension?</h2>
      <p>Hypertension, or high blood pressure, occurs when the force of blood pushing against artery walls is consistently too high. Blood pressure is recorded as two numbers: <strong>systolic</strong> (pressure when the heart beats) over <strong>diastolic</strong> (pressure between beats). A normal reading is below 120/80 mmHg.</p>
      <p>According to the World Health Organization, an estimated <strong>1.28 billion adults</strong> aged 30–79 years worldwide have hypertension — and nearly half are unaware of their condition. This is why it earned the nickname "the silent killer."</p>

      <h2>Classification of Blood Pressure</h2>
      <div class="bp-table">
        <table>
          <thead><tr><th>Category</th><th>Systolic (mmHg)</th><th>Diastolic (mmHg)</th></tr></thead>
          <tbody>
            <tr class="normal"><td>Normal</td><td>&lt; 120</td><td>&lt; 80</td></tr>
            <tr class="elevated"><td>Elevated</td><td>120–129</td><td>&lt; 80</td></tr>
            <tr class="stage1"><td>Stage 1 Hypertension</td><td>130–139</td><td>80–89</td></tr>
            <tr class="stage2"><td>Stage 2 Hypertension</td><td>≥ 140</td><td>≥ 90</td></tr>
            <tr class="crisis"><td>Hypertensive Crisis</td><td>&gt; 180</td><td>&gt; 120</td></tr>
          </tbody>
        </table>
      </div>

      <h2>How Hypertension Damages the Body</h2>
      <p>Sustained high pressure damages the inner lining of arteries, triggering inflammation and plaque build-up (atherosclerosis). Over years, this raises the risk of:</p>
      <ul>
        <li><strong>Heart attack and heart failure</strong> – the heart must work harder, causing it to enlarge and weaken.</li>
        <li><strong>Stroke</strong> – ruptured or blocked brain vessels deprive brain tissue of oxygen.</li>
        <li><strong>Chronic kidney disease</strong> – damaged kidney vessels lose their filtering ability.</li>
        <li><strong>Retinopathy</strong> – pressure damages tiny blood vessels in the retina, risking vision loss.</li>
        <li><strong>Aortic aneurysm</strong> – weakened aortic walls can bulge and rupture, a life-threatening emergency.</li>
      </ul>

      <h2>Diagnosis</h2>
      <p>Diagnosis requires <strong>multiple readings</strong> on at least two separate occasions. A single elevated reading may reflect "white-coat hypertension" (anxiety in a clinical setting). Your doctor may order:</p>
      <ul>
        <li>24-hour ambulatory blood pressure monitoring (ABPM)</li>
        <li>Urinalysis and blood tests (kidney function, electrolytes, cholesterol)</li>
        <li>Electrocardiogram (ECG) to check for heart enlargement</li>
        <li>Echocardiogram for heart structure evaluation</li>
      </ul>

      <h2>Treatment & Management</h2>
      <h3>Lifestyle Modifications (First-Line)</h3>
      <ul>
        <li><strong>DASH Diet:</strong> Rich in fruits, vegetables, whole grains, low-fat dairy; limit sodium to &lt; 2,300 mg/day.</li>
        <li><strong>Exercise:</strong> 150 minutes of moderate aerobic activity per week can lower BP by 5–8 mmHg.</li>
        <li><strong>Weight loss:</strong> Losing just 10 lbs (4.5 kg) can reduce systolic BP by 5–20 mmHg.</li>
        <li><strong>Limit alcohol:</strong> No more than 1 drink/day for women, 2 for men.</li>
        <li><strong>Quit smoking:</strong> Nicotine spikes BP acutely and damages vessel walls long-term.</li>
        <li><strong>Stress management:</strong> Mindfulness, yoga, and adequate sleep have measurable benefits.</li>
      </ul>
      <h3>Medications</h3>
      <p>When lifestyle changes are insufficient, physicians prescribe antihypertensives. Common classes include:</p>
      <ul>
        <li><strong>ACE inhibitors</strong> (e.g., lisinopril) – relax blood vessels</li>
        <li><strong>ARBs</strong> (e.g., losartan) – block angiotensin receptors</li>
        <li><strong>Calcium channel blockers</strong> (e.g., amlodipine) – relax vessel walls</li>
        <li><strong>Diuretics</strong> (e.g., hydrochlorothiazide) – reduce fluid volume</li>
        <li><strong>Beta-blockers</strong> (e.g., metoprolol) – slow heart rate and output</li>
      </ul>
      <p class="callout">💡 <strong>Key Point:</strong> Antihypertensive medication must be taken consistently — stopping abruptly can cause a dangerous rebound rise in BP.</p>

      <h2>Prevention</h2>
      <p>Population-wide salt reduction is one of the most cost-effective public health interventions. On an individual level, regular home blood pressure monitoring empowers patients to detect changes early. Devices should be validated and arms should be rested at heart level for accurate readings.</p>
    `,
    references: [
      { text: "World Health Organization. (2023). Hypertension Key Facts.", url: "https://www.who.int/news-room/fact-sheets/detail/hypertension" },
      { text: "Whelton PK, et al. (2018). 2017 ACC/AHA Hypertension Guideline. Journal of the American College of Cardiology.", url: "#" },
      { text: "GBD 2019 Risk Factors Collaborators. (2020). Global burden of 87 risk factors. The Lancet.", url: "#" }
    ],
    quizId: "hypertension-quiz"
  },
  {
    id: "diabetes-t2",
    title: "Type 2 Diabetes Demystified",
    subtitle: "From insulin resistance to long-term complications",
    date: "2026-04-03",
    author: { name: "Dr. James Okonkwo", credentials: "MD, Endocrinologist", avatar: "JO" },
    category: "Endocrinology",
    tags: ["diabetes", "blood sugar", "insulin", "metabolic", "chronic"],
    readTime: "10 min",
    featured: false,
    heroColor: "linear-gradient(135deg,#7b2d8b 0%,#c77dff 100%)",
    heroIcon: `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,.9)" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 10 4 14.5 4 17a8 8 0 0016 0c0-2.5-2.5-7-8-15z"/></svg>`,
    quickFacts: {
      symptoms: ["Frequent urination", "Excessive thirst", "Fatigue", "Blurred vision", "Slow-healing wounds", "Recurring infections", "Numbness in hands/feet"],
      riskFactors: ["Overweight / obesity", "Physical inactivity", "Pre-diabetes", "Family history", "Age > 45", "Gestational diabetes history", "Polycystic ovary syndrome"],
      whenToSeeDoctor: "Fasting blood glucose ≥ 126 mg/dL on two occasions, or HbA1c ≥ 6.5%. Seek care immediately for symptoms of diabetic ketoacidosis (DKA): vomiting, fruity breath, confusion."
    },
    content: `
      <h2>The Basics: Glucose and Insulin</h2>
      <p>Every cell in your body runs on glucose — a simple sugar derived from the food you eat. The hormone <strong>insulin</strong>, produced by beta cells in the pancreas, acts like a key that unlocks cells to let glucose in. In Type 2 Diabetes (T2D), this system breaks down in two ways:</p>
      <ol>
        <li><strong>Insulin resistance:</strong> Muscle, fat, and liver cells stop responding effectively to insulin signals.</li>
        <li><strong>Beta cell failure:</strong> The pancreas initially compensates by producing more insulin, but over time the beta cells exhaust and output falls.</li>
      </ol>
      <p>The result: glucose builds up in the bloodstream — a state called <strong>hyperglycemia</strong> — while starved cells struggle to function.</p>

      <h2>The Prediabetes Stage</h2>
      <p>Before T2D develops, most people pass through <strong>prediabetes</strong>, where blood sugar is elevated but not yet diabetic. This window — which can last 3–10 years — is a critical intervention opportunity. The landmark <strong>Diabetes Prevention Program</strong> study showed that intensive lifestyle changes (7% weight loss + 150 min exercise/week) reduced progression to T2D by <strong>58%</strong>, outperforming the drug metformin alone.</p>

      <h2>Long-Term Complications (The "ABCDs" of Diabetes)</h2>
      <h3>Macrovascular (Large Blood Vessels)</h3>
      <ul>
        <li><strong>Cardiovascular disease</strong> – people with T2D have 2–4× the risk of heart attack and stroke.</li>
        <li><strong>Peripheral artery disease</strong> – reduced blood flow to limbs can cause pain and, in severe cases, amputation.</li>
      </ul>
      <h3>Microvascular (Small Blood Vessels)</h3>
      <ul>
        <li><strong>Diabetic nephropathy</strong> – leading cause of kidney failure in developed countries.</li>
        <li><strong>Diabetic retinopathy</strong> – leading cause of blindness in working-age adults.</li>
        <li><strong>Diabetic neuropathy</strong> – nerve damage causing pain, numbness, and autonomic dysfunction.</li>
      </ul>
      <p class="callout">📊 <strong>Critical Stat:</strong> Every 1% reduction in HbA1c is associated with a 21% decrease in diabetes-related deaths and a 37% decrease in microvascular complications.</p>

      <h2>Diagnosis Criteria</h2>
      <div class="bp-table"><table>
        <thead><tr><th>Test</th><th>Normal</th><th>Prediabetes</th><th>Diabetes</th></tr></thead>
        <tbody>
          <tr><td>Fasting Glucose</td><td>&lt; 100 mg/dL</td><td>100–125</td><td>≥ 126</td></tr>
          <tr><td>2-hr Glucose (OGTT)</td><td>&lt; 140 mg/dL</td><td>140–199</td><td>≥ 200</td></tr>
          <tr><td>HbA1c</td><td>&lt; 5.7%</td><td>5.7–6.4%</td><td>≥ 6.5%</td></tr>
          <tr><td>Random Glucose (symptoms)</td><td>—</td><td>—</td><td>≥ 200</td></tr>
        </tbody>
      </table></div>

      <h2>Treatment Approaches</h2>
      <h3>Lifestyle (Foundation of All Management)</h3>
      <ul>
        <li>Mediterranean or low-glycemic-index diet to blunt post-meal glucose spikes</li>
        <li>150–300 minutes of moderate activity weekly; resistance training improves insulin sensitivity</li>
        <li>Structured weight loss of 10–15% body weight can induce <em>remission</em> in early T2D</li>
      </ul>
      <h3>Medications</h3>
      <ul>
        <li><strong>Metformin</strong> – first-line; reduces hepatic glucose production, well-tolerated, cheap</li>
        <li><strong>SGLT-2 inhibitors</strong> (e.g., empagliflozin) – excrete glucose in urine; proven cardiovascular and kidney benefits</li>
        <li><strong>GLP-1 agonists</strong> (e.g., semaglutide) – mimic incretin hormones; potent glucose reduction + significant weight loss</li>
        <li><strong>DPP-4 inhibitors</strong> (e.g., sitagliptin) – weight-neutral, well-tolerated</li>
        <li><strong>Insulin</strong> – required when beta cell reserve is severely depleted</li>
      </ul>
    `,
    references: [
      { text: "American Diabetes Association. (2024). Standards of Care in Diabetes – 2024. Diabetes Care.", url: "#" },
      { text: "Knowler WC, et al. (2002). Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin. NEJM.", url: "#" },
      { text: "Davies MJ, et al. (2022). Management of Hyperglycemia in T2D, 2022 ADA/EASD Consensus. Diabetologia.", url: "#" }
    ],
    quizId: "diabetes-quiz"
  },
  {
    id: "asthma",
    title: "Asthma: Breathing Through the Science",
    subtitle: "Triggers, inflammation, and modern inhaler therapy",
    date: "2026-04-02",
    author: { name: "Dr. Priya Sharma", credentials: "MD, Pulmonologist", avatar: "PS" },
    category: "Pulmonology",
    tags: ["lungs", "breathing", "allergy", "chronic", "airways"],
    readTime: "8 min",
    featured: false,
    heroColor: "linear-gradient(135deg,#0a7c5c 0%,#52b788 100%)",
    heroIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9.59 4.59A2 2 0 1111 8H2"/><path d="M10.73 19.41A2 2 0 1012.73 16H2"/><path d="M15.73 8.27A2.5 2.5 0 1117.5 12H2"/></svg>`,
    quickFacts: {
      symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Chronic cough (especially at night)", "Exercise-induced breathlessness"],
      riskFactors: ["Allergies / atopy", "Family history", "Respiratory infections in childhood", "Air pollution exposure", "Occupational irritants", "Obesity", "Smoking"],
      whenToSeeDoctor: "Symptoms interfering with daily life or sleep; using rescue inhaler more than twice a week; any severe attack with rapid breathing and inability to speak full sentences — call emergency services."
    },
    content: `
      <h2>What Happens in an Asthmatic Airway?</h2>
      <p>Asthma is a chronic inflammatory disease of the airways characterized by three overlapping processes:</p>
      <ol>
        <li><strong>Bronchospasm</strong> – smooth muscle surrounding bronchi contracts, narrowing the airway lumen.</li>
        <li><strong>Mucosal edema</strong> – inflamed airway walls swell inward, further reducing diameter.</li>
        <li><strong>Mucus hypersecretion</strong> – goblet cells overproduce thick mucus that plugs small airways.</li>
      </ol>
      <p>All three mechanisms combine to create the characteristic high-pitched <strong>wheeze</strong> as air is forced through narrow passages.</p>

      <h2>Immunology: Why the Airway Overreacts</h2>
      <p>In allergic asthma (the most common form, affecting ~70% of patients), the immune system mistakenly identifies harmless substances — dust mites, pollen, pet dander — as threats. This triggers a <strong>Th2-dominant response</strong>, releasing cytokines (IL-4, IL-5, IL-13) that promote IgE production and eosinophil infiltration into the airway mucosa.</p>
      <p>Even in non-allergic asthma (triggered by cold air, exercise, or aspirin), the same final inflammatory pathway is activated.</p>

      <h2>Common Triggers</h2>
      <ul>
        <li>Allergens: house dust mites, mold, cockroach droppings, animal dander, pollen</li>
        <li>Respiratory viruses (rhinovirus is the #1 trigger of acute exacerbations)</li>
        <li>Exercise, especially in cold, dry air</li>
        <li>Cigarette smoke and air pollutants (NO₂, particulate matter)</li>
        <li>Non-steroidal anti-inflammatory drugs (NSAIDs) in aspirin-exacerbated respiratory disease</li>
        <li>Emotional stress and strong odors</li>
      </ul>

      <h2>Severity Classification (GINA)</h2>
      <div class="bp-table"><table>
        <thead><tr><th>Severity</th><th>Symptom Frequency</th><th>Night Symptoms</th><th>FEV₁</th></tr></thead>
        <tbody>
          <tr><td>Intermittent</td><td>&lt; 2 days/week</td><td>≤ 2×/month</td><td>≥ 80%</td></tr>
          <tr><td>Mild Persistent</td><td>&gt; 2 days/week</td><td>3–4×/month</td><td>≥ 80%</td></tr>
          <tr><td>Moderate Persistent</td><td>Daily</td><td>&gt; 1×/week</td><td>60–80%</td></tr>
          <tr><td>Severe Persistent</td><td>Throughout day</td><td>Often nightly</td><td>&lt; 60%</td></tr>
        </tbody>
      </table></div>

      <h2>Treatment: The Step-Up Approach</h2>
      <h3>Relievers (Short-Acting — for acute symptoms)</h3>
      <ul>
        <li><strong>SABA</strong> (Short-Acting Beta₂-Agonist, e.g., salbutamol/albuterol): Rapid bronchodilation within 5 minutes. The "blue inhaler." Should not be needed more than twice a week — frequent use signals poor control.</li>
      </ul>
      <h3>Controllers (Long-Acting — for daily use)</h3>
      <ul>
        <li><strong>ICS</strong> (Inhaled Corticosteroids, e.g., beclomethasone): First-line anti-inflammatory. Reduces airway inflammation and prevents remodeling.</li>
        <li><strong>LABA</strong> (Long-Acting Beta₂-Agonist, e.g., salmeterol): Always combined with ICS, never alone in asthma.</li>
        <li><strong>Leukotriene modifiers</strong> (e.g., montelukast): Oral; useful in allergic asthma and aspirin-sensitive patients.</li>
        <li><strong>Biologics</strong> (e.g., dupilumab, mepolizumab): Targeted therapies for severe eosinophilic or allergic asthma, blocking specific cytokines.</li>
      </ul>
      <p class="callout">🌬️ <strong>Inhaler Technique Matters:</strong> Studies show that up to 80% of patients use their inhaler incorrectly. Poor technique is a leading cause of treatment failure. Ask your pharmacist for a demonstration at every prescription fill.</p>

      <h2>Asthma Action Plan</h2>
      <p>Every asthmatic should have a written action plan (often colour-coded green/yellow/red) that tells them exactly what to do based on symptoms or peak flow readings. This tool dramatically reduces emergency department visits and hospitalizations.</p>
    `,
    references: [
      { text: "GINA. (2024). Global Strategy for Asthma Management and Prevention. Global Initiative for Asthma.", url: "https://ginasthma.org" },
      { text: "Reddel HK, et al. (2022). GINA 2022: A fundamental change in asthma management. European Respiratory Journal.", url: "#" },
      { text: "Papi A, et al. (2018). Asthma. The Lancet.", url: "#" }
    ],
    quizId: "asthma-quiz"
  },
  {
    id: "parkinsons",
    title: "Parkinson's Disease: When Dopamine Fades",
    subtitle: "Neuroscience, motor control, and hope in modern therapy",
    date: "2026-04-01",
    author: { name: "Dr. Amir Hassan", credentials: "MD, Neurologist", avatar: "AH" },
    category: "Neurology",
    tags: ["brain", "movement", "dopamine", "neurodegenerative", "tremor"],
    readTime: "11 min",
    featured: false,
    heroColor: "linear-gradient(135deg,#3a0ca3 0%,#7209b7 100%)",
    heroIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    quickFacts: {
      symptoms: ["Resting tremor (pill-rolling)", "Bradykinesia (slow movement)", "Muscle rigidity", "Postural instability", "Micrographia (small handwriting)", "Masked face (reduced expression)", "Sleep disturbances", "Depression / anxiety"],
      riskFactors: ["Age > 60", "Male sex", "Family history / LRRK2 gene variants", "Pesticide exposure", "Head trauma", "Well-water consumption (manganese)"],
      whenToSeeDoctor: "Any unilateral resting tremor, unexplained slowing of movement, or stiffness — especially if accompanied by a shuffling gait or loss of arm swing when walking."
    },
    content: `
      <h2>The Dopamine Story</h2>
      <p>Parkinson's Disease (PD) is a progressive neurodegenerative disorder primarily affecting the <strong>substantia nigra</strong> — a small, pigmented region in the midbrain whose neurons produce <strong>dopamine</strong>. Dopamine is the neurotransmitter that fine-tunes movement, enabling smooth, coordinated motor control.</p>
      <p>In PD, these neurons die at an accelerated rate. By the time motor symptoms appear, <strong>60–80% of dopaminergic neurons</strong> have already been lost. This explains why the disease is so difficult to catch early.</p>

      <h2>Lewy Bodies: The Pathological Hallmark</h2>
      <p>The dying neurons accumulate abnormal protein clumps called <strong>Lewy bodies</strong>, composed primarily of misfolded <strong>alpha-synuclein</strong> protein. Emerging research (the "Braak hypothesis") suggests PD may begin in the gut's enteric nervous system or olfactory bulb and spread to the brain — potentially explaining why constipation and loss of smell often precede motor symptoms by <em>decades</em>.</p>

      <h2>Cardinal Motor Features (TRAP)</h2>
      <ul>
        <li><strong>T – Tremor:</strong> Resting, 4–6 Hz, classically "pill-rolling" between thumb and forefinger. Disappears with intentional movement.</li>
        <li><strong>R – Rigidity:</strong> Increased resistance to passive limb movement throughout the range of motion ("lead pipe"). May have a "cogwheel" quality when combined with tremor.</li>
        <li><strong>A – Akinesia/Bradykinesia:</strong> Poverty and slowness of movement. Manifests as small shuffling steps, reduced arm swing, quiet monotone voice, and difficulty initiating movement.</li>
        <li><strong>P – Postural Instability:</strong> Impaired righting reflexes, leading to falls. Usually a later feature.</li>
      </ul>

      <h2>Non-Motor Features (Often Overlooked)</h2>
      <p>PD is far more than a movement disorder. Non-motor symptoms cause significant disability:</p>
      <ul>
        <li><strong>Autonomic dysfunction:</strong> Orthostatic hypotension, constipation, urinary urgency, sexual dysfunction</li>
        <li><strong>Neuropsychiatric:</strong> Depression (affects ~40%), anxiety, hallucinations, impulse-control disorders (often medication-related)</li>
        <li><strong>Cognitive:</strong> Mild cognitive impairment progressing to Parkinson's dementia in ~80% after 20 years</li>
        <li><strong>Sleep:</strong> REM sleep behaviour disorder (acting out dreams) — can precede PD by 10+ years</li>
        <li><strong>Olfaction:</strong> Loss of smell (hyposmia) in ~90% of patients</li>
      </ul>

      <h2>Diagnosis: Still Clinical</h2>
      <p>There is no definitive blood test or brain scan for PD. Diagnosis rests on clinical criteria (UK Parkinson's Disease Society Brain Bank Criteria). DaT-SPECT imaging can show reduced dopamine transporter activity in the striatum, helpful for atypical cases. DAT-Scan cannot differentiate PD from other parkinsonian syndromes.</p>

      <h2>Treatment</h2>
      <h3>Pharmacological</h3>
      <ul>
        <li><strong>Levodopa / Carbidopa (Sinemet):</strong> Gold standard since 1967. Levodopa crosses the blood-brain barrier and is converted to dopamine. Carbidopa prevents peripheral conversion, reducing side effects. Eventually causes motor fluctuations ("wearing off") and dyskinesias.</li>
        <li><strong>Dopamine agonists</strong> (e.g., pramipexole, ropinirole): Directly stimulate dopamine receptors. First-line in younger patients to delay levodopa complications. Risk of impulse-control disorders.</li>
        <li><strong>MAO-B inhibitors</strong> (e.g., rasagiline, selegiline): Prevent dopamine breakdown. Used as adjunct or early monotherapy.</li>
        <li><strong>COMT inhibitors</strong> (e.g., entacapone): Extend levodopa effect by blocking its breakdown.</li>
      </ul>
      <h3>Surgical</h3>
      <p><strong>Deep Brain Stimulation (DBS)</strong> delivers electrical pulses to the subthalamic nucleus or globus pallidus internus. Dramatically reduces tremor and motor fluctuations. Does not slow disease progression.</p>
      <h3>Neuroprotection: The Horizon</h3>
      <p class="callout">🔬 <strong>Research Frontier:</strong> Alpha-synuclein-targeting therapies (antibodies, gene silencing) are in clinical trials. Exercise has shown the strongest neuroprotective signal in animal models and observational human studies — high-intensity aerobic training may genuinely slow progression.</p>
    `,
    references: [
      { text: "Bloem BR, Okun MS, Klein C. (2021). Parkinson's disease. The Lancet.", url: "#" },
      { text: "Postuma RB, et al. (2015). MDS clinical diagnostic criteria for Parkinson's disease. Movement Disorders.", url: "#" },
      { text: "Kalia LV, Lang AE. (2015). Parkinson's disease. The Lancet.", url: "#" }
    ],
    quizId: "parkinsons-quiz"
  },
  {
    id: "migraine",
    title: "Migraine: Far More Than a Headache",
    subtitle: "The neurobiology of the world's most disabling headache disorder",
    date: "2026-03-31",
    author: { name: "Dr. Sarah Mitchell", credentials: "MD, Neurologist", avatar: "SM" },
    category: "Neurology",
    tags: ["headache", "pain", "aura", "neurology", "chronic"],
    readTime: "8 min",
    featured: false,
    heroColor: "linear-gradient(135deg,#b5179e 0%,#f72585 100%)",
    heroIcon: `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,.9)" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    quickFacts: {
      symptoms: ["Unilateral throbbing headache", "Nausea / vomiting", "Photophobia (light sensitivity)", "Phonophobia (sound sensitivity)", "Aura (visual zigzags, numbness)", "Cognitive fog ('migraine brain')", "Neck stiffness"],
      riskFactors: ["Female sex (3× more common)", "Family history", "Hormonal changes (menstruation, OCP)", "Sleep disruption", "Stress", "Certain foods/drinks (alcohol, caffeine withdrawal)", "Strong sensory stimuli"],
      whenToSeeDoctor: "Any 'thunderclap' headache (worst of life, sudden onset) — go to ER immediately. Also: headaches with fever/stiff neck, new neurological symptoms, or headaches worsening progressively over weeks."
    },
    content: `
      <h2>Migraine by the Numbers</h2>
      <p>Migraine affects approximately <strong>1 billion people</strong> globally — about 14% of the world's population. It is the <strong>second leading cause of disability</strong> worldwide (Global Burden of Disease study) and the most disabling condition among people aged 15–49. Despite this, it remains chronically underdiagnosed and undertreated.</p>

      <h2>Phases of a Migraine Attack</h2>
      <p>A full migraine attack progresses through distinct phases:</p>
      <ol>
        <li><strong>Prodrome (hours to days before):</strong> Mood changes, food cravings, yawning, neck stiffness, increased urination. About 77% of migraineurs experience this.</li>
        <li><strong>Aura (if present, 20–30 min before pain):</strong> Fully reversible neurological symptoms — most commonly visual (scintillating scotoma, zigzag "fortification" patterns), but can be sensory (numbness), motor (weakness), or speech disturbance.</li>
        <li><strong>Headache (4–72 hours):</strong> Moderate to severe, unilateral, throbbing. Worsened by physical activity. Accompanied by nausea and/or light/sound sensitivity.</li>
        <li><strong>Postdrome ("migraine hangover"):</strong> Fatigue, cognitive fog, mood changes lasting up to 24 hours after pain resolves.</li>
      </ol>

      <h2>The Neurobiology: Cortical Spreading Depression</h2>
      <p>The aura is caused by <strong>cortical spreading depression (CSD)</strong> — a slowly propagating (2–3 mm/min) wave of neuronal depolarization followed by suppression that sweeps across the cortex. This corresponds to the expanding "march" of visual symptoms.</p>
      <p>The headache phase involves activation of the <strong>trigeminovascular system</strong>. Trigeminal nerve fibers innervating meningeal vessels release inflammatory neuropeptides, particularly <strong>CGRP</strong> (calcitonin gene-related peptide), causing vasodilation and meningeal inflammation that the brain interprets as excruciating pain.</p>

      <h2>Triggers vs. Predispositions</h2>
      <p>Important distinction: migraine occurs in people with a <strong>low threshold brain</strong>. Triggers don't cause migraine — they lower the threshold below the attack point. Common triggers include:</p>
      <ul>
        <li>Sleep changes (too little or too much)</li>
        <li>Stress and stress let-down ("weekend migraine")</li>
        <li>Hormonal fluctuations (menstrual migraine)</li>
        <li>Dehydration and skipped meals</li>
        <li>Alcohol (especially red wine and spirits)</li>
        <li>Bright/flickering lights, strong smells, loud sounds</li>
        <li>Weather changes (barometric pressure)</li>
      </ul>
      <p class="callout">⚠️ <strong>Medication Overuse Headache (MOH):</strong> Using acute pain relievers (including triptans) more than 10–15 days/month can paradoxically <em>worsen</em> migraine, creating a cycle of rebound headaches. If you're reaching for pain medication this often, discuss preventive therapy with your doctor.</p>

      <h2>Treatment</h2>
      <h3>Acute (Abort the Attack)</h3>
      <ul>
        <li><strong>Triptans</strong> (e.g., sumatriptan): Serotonin (5-HT1B/1D) agonists that constrict dilated vessels and block CGRP release. Most effective if taken early. Contraindicated in cardiovascular disease.</li>
        <li><strong>CGRP receptor antagonists / gepants</strong> (e.g., ubrogepant, rimegepant): Newer class without vasoconstrictive effects; can be used in cardiovascular patients. Rimegepant can also be used preventively.</li>
        <li><strong>NSAIDs</strong> (ibuprofen, naproxen): Effective for mild-moderate attacks</li>
        <li><strong>Anti-emetics</strong> (metoclopramide): Address nausea and improve absorption of oral medications</li>
      </ul>
      <h3>Preventive (Reduce Attack Frequency)</h3>
      <ul>
        <li><strong>Anti-CGRP monoclonal antibodies</strong> (e.g., erenumab, fremanezumab): Injected monthly or quarterly; game-changing efficacy with excellent tolerability</li>
        <li><strong>Beta-blockers</strong> (propranolol, metoprolol): First-line oral preventive</li>
        <li><strong>Topiramate / valproate:</strong> Anticonvulsants with established efficacy</li>
        <li><strong>Amitriptyline:</strong> Tricyclic antidepressant effective for migraine prevention</li>
        <li><strong>OnabotulinumtoxinA (Botox):</strong> Approved for chronic migraine (≥15 headache days/month)</li>
      </ul>
    `,
    references: [
      { text: "Headache Classification Committee. (2018). ICHD-3 Classification of headache disorders (3rd ed.). Cephalalgia.", url: "#" },
      { text: "Ashina M, et al. (2021). Migraine. Nature Reviews Disease Primers.", url: "#" },
      { text: "GBD 2016 Disease and Injury Incidence and Prevalence Collaborators. (2017). The Lancet.", url: "#" }
    ],
    quizId: "migraine-quiz"
  },
  {
    id: "pneumonia",
    title: "Pneumonia: When the Lungs Fill Up",
    subtitle: "Community-acquired vs hospital-acquired, and when to worry",
    date: "2026-03-30",
    author: { name: "Dr. Priya Sharma", credentials: "MD, Pulmonologist", avatar: "PS" },
    category: "Pulmonology",
    tags: ["infection", "lungs", "bacteria", "acute", "respiratory"],
    readTime: "7 min",
    featured: false,
    heroColor: "linear-gradient(135deg,#e07000 0%,#f4a261 100%)",
    heroIcon: `<svg viewBox="0 0 24 24" fill="rgba(255,255,255,.9)" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 19H9a7 7 0 110-14 7 7 0 0112.55 2A5.5 5.5 0 0117.5 19z"/></svg>`,
    quickFacts: {
      symptoms: ["Productive cough (rusty sputum)", "Fever and chills", "Chest pain (pleuritic — sharp, worsened by breathing)", "Shortness of breath", "Fatigue", "Confusion (especially in elderly)"],
      riskFactors: ["Age > 65 or < 2", "Smoking", "COPD or asthma", "Immunosuppression (HIV, chemotherapy)", "Diabetes", "Heart failure", "Alcoholism", "Recent viral respiratory infection"],
      whenToSeeDoctor: "Fever with productive cough lasting more than 3 days. Seek emergency care for: severe shortness of breath, oxygen saturation < 94%, confusion, cyanosis (blue lips/fingertips), or a respiratory rate > 30/min."
    },
    content: `
      <h2>What Is Pneumonia?</h2>
      <p>Pneumonia is infection of the lung parenchyma — specifically the alveoli (air sacs) — causing them to fill with fluid, pus, and inflammatory cells. This consolidation impairs gas exchange, reducing the lung's ability to oxygenate blood. Globally, pneumonia kills over <strong>2.5 million people annually</strong>, making it the world's leading infectious cause of death in children under five.</p>

      <h2>Classification by Setting</h2>
      <ul>
        <li><strong>Community-Acquired Pneumonia (CAP):</strong> Acquired outside healthcare settings. Most common causative organism: <em>Streptococcus pneumoniae</em>. Also: <em>Mycoplasma pneumoniae</em>, <em>Haemophilus influenzae</em>, viral (influenza, SARS-CoV-2).</li>
        <li><strong>Hospital-Acquired Pneumonia (HAP):</strong> Occurs ≥ 48 hours after hospital admission. More likely due to resistant organisms (MRSA, Pseudomonas, Klebsiella). Carries much higher mortality.</li>
        <li><strong>Aspiration Pneumonia:</strong> Inhalation of oral/gastric contents into the lungs. Risk is high in patients with dysphagia, reduced consciousness, or severe GERD.</li>
        <li><strong>Pneumocystis pneumonia (PCP):</strong> Caused by the fungus <em>Pneumocystis jirovecii</em>; almost exclusively in severely immunocompromised patients (AIDS, organ transplant).</li>
      </ul>

      <h2>Pathophysiology</h2>
      <p>The lung has multiple defense mechanisms: mucociliary clearance, alveolar macrophages, and secretory IgA. Pneumonia occurs when these are overwhelmed — by a large inoculum, a virulent pathogen, or a weakened host. The infecting organism triggers the innate immune response, causing:</p>
      <ol>
        <li><strong>Congestion</strong> (vascular engorgement, protein-rich exudate in alveoli)</li>
        <li><strong>Red hepatization</strong> (RBCs and fibrin fill alveoli — lung resembles red liver tissue)</li>
        <li><strong>Grey hepatization</strong> (RBCs lyse; WBCs dominate)</li>
        <li><strong>Resolution</strong> (macrophages clear debris — takes 2–4 weeks on imaging even if symptoms resolve)</li>
      </ol>

      <h2>Severity Scoring: CURB-65</h2>
      <p>The CURB-65 score helps clinicians decide: send home, admit to ward, or ICU?</p>
      <div class="bp-table"><table>
        <thead><tr><th>Criterion</th><th>1 Point Each</th></tr></thead>
        <tbody>
          <tr><td>C – Confusion</td><td>New disorientation</td></tr>
          <tr><td>U – Urea</td><td>BUN > 19 mg/dL (> 7 mmol/L)</td></tr>
          <tr><td>R – Respiratory Rate</td><td>≥ 30 breaths/min</td></tr>
          <tr><td>B – Blood Pressure</td><td>Systolic &lt; 90 or Diastolic ≤ 60 mmHg</td></tr>
          <tr><td>65 – Age</td><td>≥ 65 years</td></tr>
        </tbody>
      </table></div>
      <p>Score 0–1: Outpatient | Score 2: Inpatient | Score ≥ 3: Consider ICU.</p>

      <h2>Treatment</h2>
      <ul>
        <li><strong>CAP (outpatient, healthy adult):</strong> Amoxicillin or doxycycline; if atypical suspected, azithromycin</li>
        <li><strong>CAP (inpatient):</strong> Beta-lactam + macrolide, or respiratory fluoroquinolone</li>
        <li><strong>CAP (ICU-level):</strong> Broad-spectrum beta-lactam + macrolide + anti-MRSA if risk factors present</li>
        <li><strong>Supportive:</strong> Oxygen therapy, IV fluids, antipyretics, physiotherapy</li>
        <li><strong>Prevention:</strong> Pneumococcal vaccine (PCV15/PCV20), influenza vaccine annually — dramatically reduces severe CAP</li>
      </ul>
      <p class="callout">💉 <strong>Vaccine Reminder:</strong> The pneumococcal vaccine reduces risk of invasive pneumococcal disease by 60–80% in adults over 65. If you or a loved one hasn't had it — speak to your GP today.</p>
    `,
    references: [
      { text: "Mandell LA, et al. (2007). IDSA/ATS Consensus Guidelines on CAP. Clinical Infectious Diseases.", url: "#" },
      { text: "Waterer GW, et al. (2018). Management of Community-Acquired Pneumonia in Adults. AJRCCM.", url: "#" },
      { text: "WHO. (2022). Pneumonia Fact Sheet. World Health Organization.", url: "https://www.who.int/news-room/fact-sheets/detail/pneumonia" }
    ],
    quizId: "pneumonia-quiz"
  }
];

// ─── QUIZ DATA ───────────────────────────────

const QUIZZES = {
  "hypertension-quiz": {
    title: "Hypertension Quiz",
    description: "Test your knowledge on high blood pressure.",
    postId: "hypertension",
    questions: [
      {
        q: "What blood pressure reading is classified as 'Stage 2 Hypertension'?",
        options: ["120/80 mmHg", "130/85 mmHg", "140/90 mmHg or higher", "155/95 mmHg"],
        correct: 2,
        explanation: "Stage 2 hypertension is defined as a systolic reading of ≥ 140 mmHg OR a diastolic reading of ≥ 90 mmHg. This typically requires two or more medications to manage."
      },
      {
        q: "Why is hypertension called 'the silent killer'?",
        options: ["It causes sudden death without warning", "It often has no noticeable symptoms for years", "It only affects the heart, which is 'silent'", "It is impossible to diagnose"],
        correct: 1,
        explanation: "Hypertension typically produces no symptoms until it causes end-organ damage (heart attack, stroke, kidney failure). This is why regular BP monitoring is critical even when you feel fine."
      },
      {
        q: "Which dietary pattern is evidence-based as a first-line intervention for hypertension?",
        options: ["Ketogenic Diet", "DASH Diet", "Mediterranean Diet", "Atkins Diet"],
        correct: 1,
        explanation: "The DASH (Dietary Approaches to Stop Hypertension) diet is the most extensively studied dietary intervention for hypertension, shown to reduce systolic BP by 8–14 mmHg."
      },
      {
        q: "Which class of antihypertensive medication works by blocking the renin-angiotensin system?",
        options: ["Beta-blockers", "Calcium channel blockers", "Diuretics", "ACE inhibitors"],
        correct: 3,
        explanation: "ACE (Angiotensin-Converting Enzyme) inhibitors block the conversion of angiotensin I to angiotensin II, which is a potent vasoconstrictor. This relaxes blood vessels and lowers BP."
      },
      {
        q: "What is a 'hypertensive crisis' blood pressure reading?",
        options: ["Above 130/80 mmHg", "Above 150/90 mmHg", "Above 180/120 mmHg", "Above 200/100 mmHg"],
        correct: 2,
        explanation: "A hypertensive crisis is defined as BP > 180/120 mmHg. If accompanied by symptoms (chest pain, vision changes, confusion), it is a hypertensive emergency requiring immediate care."
      }
    ]
  },
  "diabetes-quiz": {
    title: "Type 2 Diabetes Quiz",
    description: "Test your knowledge on blood sugar, insulin, and diabetes management.",
    postId: "diabetes-t2",
    questions: [
      {
        q: "What HbA1c value confirms a diagnosis of Type 2 Diabetes?",
        options: ["≥ 5.7%", "≥ 6.0%", "≥ 6.5%", "≥ 7.0%"],
        correct: 2,
        explanation: "An HbA1c of ≥ 6.5% on two separate occasions confirms diabetes. HbA1c reflects average blood glucose over the past 2–3 months, making it a reliable diagnostic marker."
      },
      {
        q: "What is the first-line medication for Type 2 Diabetes?",
        options: ["Insulin", "Metformin", "Glipizide", "Empagliflozin"],
        correct: 1,
        explanation: "Metformin remains the first-line pharmacological treatment for T2D in most guidelines due to its safety, efficacy, low cost, and potential cardiovascular benefits."
      },
      {
        q: "By how much did lifestyle intervention reduce progression from prediabetes to T2D in the Diabetes Prevention Program?",
        options: ["25%", "40%", "58%", "73%"],
        correct: 2,
        explanation: "The landmark DPP study showed that intensive lifestyle modification (7% weight loss + 150 min/week exercise) reduced T2D incidence by 58%, significantly outperforming metformin (31%)."
      },
      {
        q: "Which complication of diabetes is the leading cause of blindness in working-age adults?",
        options: ["Diabetic nephropathy", "Diabetic neuropathy", "Diabetic retinopathy", "Diabetic cardiomyopathy"],
        correct: 2,
        explanation: "Diabetic retinopathy, caused by damage to small blood vessels in the retina, is the leading cause of blindness in adults aged 20–74 in developed countries."
      },
      {
        q: "GLP-1 receptor agonists (like semaglutide) have which additional benefit beyond glucose control?",
        options: ["They cure diabetes permanently", "They significantly reduce body weight", "They replace insulin entirely", "They prevent all cardiovascular events"],
        correct: 1,
        explanation: "GLP-1 receptor agonists promote satiety and slow gastric emptying, leading to significant weight reduction (5–15% body weight loss), making them powerful dual-purpose agents."
      }
    ]
  },
  "asthma-quiz": {
    title: "Asthma Quiz",
    description: "Test your understanding of asthma triggers, physiology, and treatment.",
    postId: "asthma",
    questions: [
      {
        q: "What are the three main pathological mechanisms in asthma?",
        options: ["Infection, fever, and cough", "Bronchospasm, mucosal edema, and mucus hypersecretion", "Atelectasis, fibrosis, and effusion", "Vasoconstriction, necrosis, and calcification"],
        correct: 1,
        explanation: "Asthma involves bronchospasm (smooth muscle contraction), mucosal edema (inflammatory swelling), and mucus hypersecretion (thick plugs). All three narrow the airway and cause wheeze."
      },
      {
        q: "What is the most common trigger of acute asthma exacerbations?",
        options: ["Exercise", "Cold air", "Respiratory viruses (especially rhinovirus)", "Aspirin"],
        correct: 2,
        explanation: "Respiratory viruses, particularly rhinovirus (the common cold virus), are the most common trigger of acute asthma exacerbations, responsible for up to 80% of attacks in children."
      },
      {
        q: "A patient's 'blue inhaler' contains which medication?",
        options: ["Inhaled corticosteroid (ICS)", "Short-Acting Beta₂-Agonist (SABA)", "Long-Acting Beta₂-Agonist (LABA)", "Leukotriene modifier"],
        correct: 1,
        explanation: "The 'blue inhaler' (typically salbutamol/albuterol) contains a SABA — a rapid bronchodilator for acute symptom relief. It should not be needed more than twice weekly."
      },
      {
        q: "Why should LABAs (Long-Acting Beta₂-Agonists) never be used alone in asthma?",
        options: ["They are too expensive", "They cause cardiac arrhythmias always", "Monotherapy LABA increases risk of asthma-related death", "They worsen inflammation"],
        correct: 2,
        explanation: "Clinical trials demonstrated increased asthma-related deaths with LABA monotherapy. LABAs must always be combined with inhaled corticosteroids (ICS) in asthma management."
      },
      {
        q: "What percentage of asthma patients are estimated to use their inhaler incorrectly?",
        options: ["10–20%", "30–40%", "Up to 80%", "Over 95%"],
        correct: 2,
        explanation: "Studies consistently show that up to 80% of patients use their inhalers incorrectly, which significantly reduces drug deposition in the lungs and leads to treatment failure."
      }
    ]
  },
  "parkinsons-quiz": {
    title: "Parkinson's Disease Quiz",
    description: "Test your knowledge on Parkinson's neuroscience and treatment.",
    postId: "parkinsons",
    questions: [
      {
        q: "Which brain region is primarily affected in Parkinson's disease?",
        options: ["Prefrontal cortex", "Hippocampus", "Substantia nigra", "Cerebellum"],
        correct: 2,
        explanation: "The substantia nigra pars compacta is the primary site of neurodegeneration in PD. Its dopaminergic neurons project to the striatum via the nigrostriatal pathway, regulating smooth movement."
      },
      {
        q: "By the time motor symptoms appear in Parkinson's disease, approximately what percentage of dopaminergic neurons have been lost?",
        options: ["10–20%", "30–40%", "60–80%", "Over 95%"],
        correct: 2,
        explanation: "Symptoms typically appear only after 60–80% of dopaminergic neurons in the substantia nigra are lost, explaining why PD is so hard to detect early and why neuroprotection is a research priority."
      },
      {
        q: "What does the acronym 'TRAP' stand for in Parkinson's cardinal features?",
        options: ["Tremor, Rigidity, Akinesia, Postural instability", "Tachycardia, Rest, Ataxia, Pain", "Tremor, Rigidity, Aphasia, Paralysis", "Tone, Reflexes, Atrophy, Paresthesia"],
        correct: 0,
        explanation: "TRAP describes the four cardinal motor features: Tremor (resting, pill-rolling), Rigidity (lead pipe/cogwheel), Akinesia/Bradykinesia (slowness), and Postural instability (falls, a late feature)."
      },
      {
        q: "What is the gold-standard medication for Parkinson's disease?",
        options: ["Pramipexole", "Levodopa/Carbidopa", "Rasagiline", "Amantadine"],
        correct: 1,
        explanation: "Levodopa combined with carbidopa (Sinemet) has been the cornerstone of PD treatment since the late 1960s. Carbidopa prevents peripheral conversion of levodopa, reducing side effects."
      },
      {
        q: "Which early non-motor symptom can precede Parkinson's motor symptoms by a decade or more?",
        options: ["Dementia", "Orthostatic hypotension", "REM sleep behaviour disorder (acting out dreams)", "Tremor"],
        correct: 2,
        explanation: "REM sleep behaviour disorder (RBD) — where patients physically act out their dreams — can precede PD by 10+ years and is considered a major prodromal marker of the disease."
      }
    ]
  },
  "migraine-quiz": {
    title: "Migraine Quiz",
    description: "Test your knowledge on migraine neurobiology and treatment.",
    postId: "migraine",
    questions: [
      {
        q: "Migraine is ranked as the ___ leading cause of disability worldwide.",
        options: ["Fifth", "Third", "Second", "First"],
        correct: 2,
        explanation: "According to the Global Burden of Disease study, migraine is the second leading cause of disability worldwide, and the most disabling condition among people aged 15–49."
      },
      {
        q: "What neurophysiological phenomenon explains migraine aura?",
        options: ["Cerebral vasoconstriction syndrome", "Cortical spreading depression (CSD)", "Trigeminocervical activation", "Thalamic sensitization"],
        correct: 1,
        explanation: "Cortical spreading depression — a wave of neuronal depolarization followed by suppression spreading at 2–3 mm/min across the cortex — generates the aura symptoms."
      },
      {
        q: "Which neuropeptide is the primary target of the newest migraine-specific treatments?",
        options: ["Substance P", "CGRP (Calcitonin Gene-Related Peptide)", "Serotonin (5-HT)", "Glutamate"],
        correct: 1,
        explanation: "CGRP is released by trigeminal fibers and causes meningeal vasodilation and neurogenic inflammation. Anti-CGRP antibodies (e.g., erenumab) and gepants (CGRP receptor blockers) are game-changers."
      },
      {
        q: "Medication Overuse Headache (MOH) occurs when acute pain relievers are used more than how many days per month?",
        options: ["5 days", "10–15 days", "20 days", "25 days"],
        correct: 1,
        explanation: "Using acute headache medications (triptans, analgesics, opioids) more than 10–15 days/month can paradoxically worsen migraine frequency, creating a cycle of rebound headaches."
      },
      {
        q: "Which headache presentation requires IMMEDIATE emergency evaluation?",
        options: ["Unilateral throbbing headache with nausea", "Headache worsening with light", "'Thunderclap' headache — the worst headache of your life with sudden onset", "Morning headache with visual aura"],
        correct: 2,
        explanation: "A 'thunderclap' headache (sudden, severe, peak intensity within 60 seconds) is a red flag for subarachnoid haemorrhage — a life-threatening bleed. It requires immediate CT scan and emergency care."
      }
    ]
  },
  "pneumonia-quiz": {
    title: "Pneumonia Quiz",
    description: "Test your understanding of lung infections, severity scoring, and treatment.",
    postId: "pneumonia",
    questions: [
      {
        q: "What is the most common causative organism of community-acquired pneumonia?",
        options: ["Mycoplasma pneumoniae", "Haemophilus influenzae", "Streptococcus pneumoniae", "Klebsiella pneumoniae"],
        correct: 2,
        explanation: "Streptococcus pneumoniae ('pneumococcus') is the most common bacterial cause of CAP, responsible for approximately 15–35% of cases requiring hospitalization."
      },
      {
        q: "In the CURB-65 scoring system, what does the 'B' stand for?",
        options: ["Breathing rate > 30/min", "Blood pressure < 90/60 mmHg", "Blood oxygen < 90%", "Bilateral infiltrates on X-ray"],
        correct: 1,
        explanation: "In CURB-65, 'B' stands for Blood pressure — specifically a systolic < 90 mmHg or diastolic ≤ 60 mmHg. Each component scores 1 point; ≥ 3 points suggests ICU-level care is needed."
      },
      {
        q: "What pathological stage of pneumonia is described as the lung resembling red liver tissue?",
        options: ["Congestion", "Red hepatization", "Grey hepatization", "Resolution"],
        correct: 1,
        explanation: "Red hepatization is the second pathological stage, where red blood cells, fibrin, and inflammatory exudate fill the alveoli, giving the lung a firm, red, liver-like appearance."
      },
      {
        q: "Pneumocystis pneumonia (PCP) is caused by which type of organism?",
        options: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungus (Pneumocystis jirovecii)", "RNA virus"],
        correct: 2,
        explanation: "PCP is caused by Pneumocystis jirovecii, a fungus previously classified as a protozoan. It almost exclusively affects severely immunocompromised patients (AIDS with CD4 < 200, organ transplant recipients)."
      },
      {
        q: "By how much does pneumococcal vaccination reduce invasive pneumococcal disease in adults over 65?",
        options: ["20–30%", "40–50%", "60–80%", "90–95%"],
        correct: 2,
        explanation: "Pneumococcal conjugate vaccines (PCV15/PCV20) reduce invasive pneumococcal disease by 60–80% in adults over 65, making them one of the most impactful preventive interventions available."
      }
    ]
  }
};

// ─── GLOSSARY DATA ───────────────────────────

const GLOSSARY = [
  { term: "Akinesia", definition: "Absence or poverty of movement; a cardinal feature of Parkinson's disease.", category: "Neurology" },
  { term: "Alveoli", definition: "Tiny air sacs in the lungs where gas exchange (oxygen/CO₂) takes place.", category: "Pulmonology" },
  { term: "Angiotensin", definition: "A hormone that causes vasoconstriction; targeted by ACE inhibitors and ARBs in hypertension treatment.", category: "Cardiology" },
  { term: "Aura", definition: "Reversible neurological symptoms (visual, sensory, or motor) that precede a migraine headache, caused by cortical spreading depression.", category: "Neurology" },
  { term: "Autonomic neuropathy", definition: "Damage to the nerves controlling involuntary functions (heart rate, BP, digestion, bladder) — a complication of long-standing diabetes.", category: "Endocrinology" },
  { term: "Beta-blocker", definition: "A class of medication that blocks adrenaline receptors, slowing heart rate and lowering blood pressure. Used in hypertension, heart failure, and migraine prevention.", category: "Cardiology" },
  { term: "Bradykinesia", definition: "Slowness of movement; a key motor feature of Parkinson's disease affecting gait, facial expression, and fine motor tasks.", category: "Neurology" },
  { term: "Bronchospasm", definition: "Sudden constriction of bronchial smooth muscle, narrowing the airway and causing wheezing — central to asthma attacks.", category: "Pulmonology" },
  { term: "CGRP", definition: "Calcitonin Gene-Related Peptide — a neuropeptide released during migraine attacks that causes vasodilation and pain; the target of modern anti-migraine biologics.", category: "Neurology" },
  { term: "Consolidation", definition: "Filling of lung air spaces with fluid, pus, or blood — seen in pneumonia on chest X-ray as an opaque (white) area.", category: "Pulmonology" },
  { term: "Cortical Spreading Depression", definition: "A wave of electrical depolarization that slowly propagates across the cortex at 2–3 mm/min, generating migraine aura symptoms.", category: "Neurology" },
  { term: "CURB-65", definition: "A clinical scoring tool (Confusion, Urea, Respiratory rate, Blood pressure, age ≥ 65) used to assess pneumonia severity and guide admission decisions.", category: "Pulmonology" },
  { term: "DASH Diet", definition: "Dietary Approaches to Stop Hypertension — a diet rich in fruits, vegetables, whole grains, and low-fat dairy; proven to reduce systolic BP by 8–14 mmHg.", category: "Cardiology" },
  { term: "Diabetic Ketoacidosis (DKA)", definition: "A life-threatening complication of diabetes where a severe insulin deficit causes the body to break down fat into ketones, making the blood dangerously acidic.", category: "Endocrinology" },
  { term: "Dopamine", definition: "A neurotransmitter essential for smooth motor control, motivation, and reward. Its deficiency in the substantia nigra causes Parkinson's disease.", category: "Neurology" },
  { term: "Dysphagia", definition: "Difficulty swallowing; can predispose to aspiration pneumonia when food or liquid enters the airway.", category: "General" },
  { term: "Echocardiogram", definition: "An ultrasound of the heart that assesses structure and function; used to detect hypertension-related heart enlargement (left ventricular hypertrophy).", category: "Cardiology" },
  { term: "Eosinophils", definition: "A type of white blood cell involved in allergic reactions and parasitic infections; elevated in the airways during asthma.", category: "Pulmonology" },
  { term: "FEV₁", definition: "Forced Expiratory Volume in 1 second — the volume of air forcibly exhaled in one second; reduced in obstructive lung diseases like asthma.", category: "Pulmonology" },
  { term: "GLP-1 Agonist", definition: "A class of medications (e.g., semaglutide) that mimic the incretin hormone GLP-1, enhancing insulin secretion, reducing appetite, and promoting weight loss.", category: "Endocrinology" },
  { term: "HbA1c", definition: "Glycated hemoglobin — reflects average blood glucose over the past 2–3 months. A key diagnostic and monitoring measure for diabetes.", category: "Endocrinology" },
  { term: "Hepatization", definition: "The pathological transformation of lung tissue to a liver-like consistency during pneumonia; occurs in red (inflammatory) and grey (resolution) phases.", category: "Pulmonology" },
  { term: "Hyperglycemia", definition: "Abnormally high blood glucose levels; the defining metabolic abnormality in diabetes mellitus.", category: "Endocrinology" },
  { term: "Hypertensive Emergency", definition: "Severely elevated blood pressure (> 180/120 mmHg) WITH acute end-organ damage (heart attack, stroke, acute kidney injury). Requires IV medication in ICU.", category: "Cardiology" },
  { term: "ICS (Inhaled Corticosteroid)", definition: "Anti-inflammatory medication delivered by inhaler, the cornerstone of long-term asthma control. Examples: beclomethasone, fluticasone.", category: "Pulmonology" },
  { term: "Insulin Resistance", definition: "A state where cells fail to respond normally to insulin, requiring the pancreas to produce more insulin to maintain normal glucose levels — an early feature of T2D.", category: "Endocrinology" },
  { term: "Lewy Bodies", definition: "Abnormal protein clumps composed of alpha-synuclein found inside dying neurons; the pathological hallmark of Parkinson's disease.", category: "Neurology" },
  { term: "Metformin", definition: "The first-line oral medication for Type 2 Diabetes; primarily reduces hepatic glucose production. Cheap, safe, and extensively studied.", category: "Endocrinology" },
  { term: "Micrographia", definition: "Progressively small and cramped handwriting; a classic early sign of Parkinson's disease caused by bradykinesia affecting fine motor control.", category: "Neurology" },
  { term: "MOH (Medication Overuse Headache)", definition: "A paradoxical worsening of headache frequency caused by overuse of acute pain medications (> 10–15 days/month); also called 'rebound headache.'", category: "Neurology" },
  { term: "Nephropathy", definition: "Kidney disease; diabetic nephropathy is kidney damage caused by chronic hyperglycemia and is the leading cause of end-stage renal disease.", category: "Endocrinology" },
  { term: "Neuropathy", definition: "Nerve damage; peripheral diabetic neuropathy causes pain, numbness, and tingling, especially in the feet and hands.", category: "Endocrinology" },
  { term: "Orthostatic Hypotension", definition: "A fall in blood pressure of ≥ 20 mmHg systolic upon standing, causing dizziness or fainting; common in Parkinson's disease due to autonomic dysfunction.", category: "Neurology" },
  { text: "Photophobia", term: "Photophobia", definition: "Abnormal sensitivity or aversion to light; a hallmark symptom during migraine attacks, caused by activation of light-sensitive neurons in the trigeminal pain pathway.", category: "Neurology" },
  { term: "Prediabetes", definition: "A state of elevated blood glucose (HbA1c 5.7–6.4%) below the diagnostic threshold for diabetes; a critical window for lifestyle intervention to prevent T2D.", category: "Endocrinology" },
  { term: "SABA (Short-Acting Beta₂-Agonist)", definition: "Rapid-acting bronchodilator (e.g., salbutamol/albuterol) used as a rescue inhaler during acute asthma symptoms. Onset within 5 minutes.", category: "Pulmonology" },
  { term: "SGLT-2 Inhibitor", definition: "A diabetes medication (e.g., empagliflozin) that prevents glucose reabsorption in the kidney, causing it to be excreted in urine. Has proven heart and kidney benefits.", category: "Endocrinology" },
  { term: "Spirometry", definition: "A pulmonary function test measuring airflow and lung volumes; essential for diagnosing and monitoring asthma and COPD.", category: "Pulmonology" },
  { term: "Stroke", definition: "Sudden disruption of blood supply to the brain (ischaemic) or bleeding into the brain (haemorrhagic), causing rapid neurological deficits. A major complication of hypertension.", category: "Neurology" },
  { term: "Substantia Nigra", definition: "A pigmented region in the midbrain that produces dopamine. Its selective degeneration is the defining neurological lesion of Parkinson's disease.", category: "Neurology" },
  { term: "Triptans", definition: "A class of migraine-specific medications (e.g., sumatriptan) that activate serotonin 5-HT1B/1D receptors, constricting dilated cerebral vessels and blocking CGRP release.", category: "Neurology" },
  { term: "Vasodilation", definition: "Widening of blood vessels, reducing vascular resistance and blood pressure. Targeted by multiple antihypertensive drug classes.", category: "Cardiology" },
  { term: "Wheeze", definition: "A high-pitched, musical breathing sound caused by airflow through narrowed airways; the classic auscultatory finding in asthma.", category: "Pulmonology" }
];

// ─── RESOURCES DATA ──────────────────────────

const RESOURCES = [
  {
    id: "r1",
    title: "Hypertension Patient Checklist",
    description: "A printable guide covering daily BP monitoring targets, medication schedule, dietary limits, and when to seek emergency care.",
    category: "Cardiology",
    type: "Checklist",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    color: "#0d4f6c",
    pages: 2
  },
  {
    id: "r2",
    title: "Diabetes Management Tracker",
    description: "Daily log for fasting glucose, post-meal readings, HbA1c targets, medication doses, and dietary notes.",
    category: "Endocrinology",
    type: "Log Sheet",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M12 2C6.5 10 4 14.5 4 17a8 8 0 0016 0c0-2.5-2.5-7-8-15z"/></svg>`,
    color: "#7b2d8b",
    pages: 4
  },
  {
    id: "r3",
    title: "Asthma Action Plan Template",
    description: "Colour-coded (Green/Yellow/Red zone) action plan with trigger list and emergency contacts — bring to your GP to personalise.",
    category: "Pulmonology",
    type: "Action Plan",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M9.59 4.59A2 2 0 1111 8H2"/><path d="M10.73 19.41A2 2 0 1012.73 16H2"/><path d="M15.73 8.27A2.5 2.5 0 1117.5 12H2"/></svg>`,
    color: "#0a7c5c",
    pages: 1
  },
  {
    id: "r4",
    title: "Migraine Diary",
    description: "Track attack frequency, duration, severity, triggers, medications taken, and their effectiveness — essential data for your neurologist.",
    category: "Neurology",
    type: "Diary",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/></svg>`,
    color: "#b5179e",
    pages: 8
  },
  {
    id: "r5",
    title: "Medical Glossary PDF",
    description: "A printable pocket reference of 40+ medical terms from the Healyis glossary, ideal for patients attending specialist appointments.",
    category: "General",
    type: "Reference",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
    color: "#10b981",
    pages: 6
  },
  {
    id: "r6",
    title: "Vaccine Schedule for Adults",
    description: "Evidence-based immunization schedule for adults, including flu, pneumococcal, shingles, and COVID-19 boosters, with age-based recommendations.",
    category: "General",
    type: "Schedule",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    color: "#f72585",
    pages: 2
  }
];
