import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCredentials } from '@/store';
import axios from 'axios';
import {
    User, Activity, Heart, TestTube, Droplets,
    HeartPulse, Footprints, FlaskConical, Stethoscope,
    ArrowRight, ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const SECTIONS = [
    { id: 1, icon: User,          title: 'Personal Demographics', desc: 'Basic patient profile' },
    { id: 2, icon: Activity,      title: 'Body Measurements',     desc: 'Anthropometric data' },
    { id: 3, icon: Heart,         title: 'Blood Pressure',        desc: 'Hypertension status' },
    { id: 4, icon: TestTube,      title: 'Lipid Profile',         desc: 'Cholesterol levels' },
    { id: 5, icon: Droplets,      title: 'Diabetes Assessment',   desc: 'Blood sugar control' },
    { id: 6, icon: HeartPulse,    title: 'CVD History',           desc: 'Cardiovascular events' },
    { id: 7, icon: Footprints,    title: 'Lifestyle Factors',     desc: 'Habits and physical activity' },
    { id: 8, icon: FlaskConical,  title: 'Advanced Biomarkers',   desc: 'Inflammation & renal function' },
    { id: 9, icon: Stethoscope,   title: 'Organ Assessment',      desc: 'Target organ damage' },
];

const inputCls = 'w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm';
const calcCls  = 'w-full bg-primary/5 border border-primary/20 text-primary font-semibold rounded-xl px-5 py-4 cursor-not-allowed text-sm';

export default function Assessment() {
    const navigate  = useNavigate();
    const dispatch  = useDispatch();
    const { token, user } = useSelector((state: RootState) => state.auth);
    const [currentStep,  setCurrentStep]  = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result,       setResult]       = useState<any>(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        age: '', sex: '', menopause: '', race: '', country: '',
        height: '', weight: '', waist: '', hip: '',
        sbp: '', dbp: '', htnStatus: '', bpMeds: '', bpNumMeds: '',
        tc: '', ldl: '', hdl: '', trig: '',
        dmStatus: '', hba1c: '', fbg: '',
        cvdHist: '', fhCvd: '',
        smoking: '', alcohol: '', activity: '', diet: '',
        crp: '', egfr: '', microalbumin: '',
        lvh: '', plaque: '', abi: '',
    });

    const updateForm = (key: string, value: string) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    const calcBMI = () => {
        if (formData.height && formData.weight) {
            const h = parseFloat(formData.height) / 100;
            const w = parseFloat(formData.weight);
            if (h > 0) return (w / (h * h)).toFixed(1);
        }
        return '—';
    };

    const calcWHR = () => {
        if (formData.waist && formData.hip) {
            const w = parseFloat(formData.waist);
            const h = parseFloat(formData.hip);
            if (h > 0) return (w / h).toFixed(2);
        }
        return '—';
    };

    const validateStep = () => {
        let valid = true;
        switch (currentStep) {
            case 0: if (!formData.age || !formData.sex || !formData.race) valid = false; break;
            case 1: if (!formData.height || !formData.weight || !formData.waist) valid = false; break;
            case 2: if (!formData.sbp || !formData.htnStatus || !formData.bpMeds) valid = false; break;
            case 3: if (!formData.tc || !formData.hdl) valid = false; break;
            case 4: if (!formData.dmStatus) valid = false; break;
            case 5: if (!formData.cvdHist || !formData.fhCvd) valid = false; break;
            case 6: if (!formData.smoking || !formData.alcohol || !formData.activity || !formData.diet) valid = false; break;
        }
        if (!valid) toast.error('Please fill out all required fields marked with * before continuing.');
        return valid;
    };

    const nextStep = async () => {
        if (!validateStep()) return;
        if (currentStep < SECTIONS.length - 1) {
            setCurrentStep(c => c + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            await submitAssessment();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(c => c - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const submitAssessment = async () => {
        if (!token) { toast.error('You must be logged in to save assessment results.'); return; }
        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/vitals/calculate-score', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Assessment completed successfully!');
            setResult(response.data.data);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to calculate assessment score.');
            navigate('/account/dashboard');
        } finally {
            setIsSubmitting(false);
        }
    };

    const skipAssessment = async () => {
        if (token && user) {
            const updatedUser = { ...user, profile: { ...(user.profile || {}), healthScore: -1 } };
            try {
                await axios.put('/api/users/profile/onboarding', { healthScore: -1 }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                dispatch(setCredentials({ user: updatedUser, token }));
            } catch (e) { console.warn('Could not sync skip status', e); }
        }
        navigate('/account/dashboard');
    };

    /* ── Option button (radio-style) ── */
    const renderOption = (key: string, label: string, value: string, sublabel?: string) => {
        const selected = formData[key as keyof typeof formData] === value;
        return (
            <button
                type="button"
                onClick={() => updateForm(key, value)}
                className={`flex w-full items-center text-left transition-all duration-200 border rounded-xl p-4 flex-1
                    ${selected
                        ? 'border-primary bg-primary/8'
                        : 'border-border bg-card hover:border-primary/40 hover:bg-primary/5'
                    }`}
            >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors
                    ${selected ? 'border-primary bg-primary' : 'border-border'}`}>
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                    <div className={`text-sm font-medium ${selected ? 'text-primary font-semibold' : 'text-foreground'}`}>
                        {label}
                    </div>
                    {sublabel && <div className="text-xs text-muted-foreground mt-0.5">{sublabel}</div>}
                </div>
            </button>
        );
    };

    const label = (text: string, required = false) => (
        <label className="block text-sm font-semibold text-foreground mb-2">
            {text} {required && <span className="text-destructive">*</span>}
        </label>
    );

    const hint = (text: string) => <p className="text-xs text-muted-foreground mb-3">{text}</p>;

    /* ── Form steps ── */
    const renderStep = () => {
        switch (currentStep) {
            case 0: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div>
                        {label('Age', true)}
                        <input type="number" className={inputCls} placeholder="e.g. 45" value={formData.age} onChange={e => updateForm('age', e.target.value)} />
                    </div>
                    <div>
                        {label('Biological Sex', true)}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('sex', 'Male', 'male')}
                            {renderOption('sex', 'Female', 'female')}
                        </div>
                    </div>
                    {formData.sex === 'female' && (
                        <div>
                            {label('Menopausal Status')}
                            {hint('Females only — affects risk stratification')}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {renderOption('menopause', 'Pre-menopausal', 'pre')}
                                {renderOption('menopause', 'Post-menopausal', 'post', 'Increases cardiovascular risk')}
                            </div>
                        </div>
                    )}
                    <div>
                        {label('Ethnicity', true)}
                        <div className="flex flex-col gap-3">
                            {renderOption('race', 'White / South Asian / Other', 'white')}
                            {renderOption('race', 'African / Afro-Caribbean', 'black')}
                        </div>
                    </div>
                    <div>
                        {label('Country of Residence')}
                        <input type="text" className={inputCls} placeholder="e.g. India, UK, USA" value={formData.country} onChange={e => updateForm('country', e.target.value)} />
                    </div>
                </div>
            );
            case 1: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            {label('Height (cm)', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 170" value={formData.height} onChange={e => updateForm('height', e.target.value)} />
                        </div>
                        <div>
                            {label('Weight (kg)', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 75" value={formData.weight} onChange={e => updateForm('weight', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        {label('BMI (auto-calculated)')}
                        <input type="text" className={calcCls} value={calcBMI()} disabled />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            {label('Waist (cm)', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 90" value={formData.waist} onChange={e => updateForm('waist', e.target.value)} />
                        </div>
                        <div>
                            {label('Hip (cm)')}
                            <input type="number" className={inputCls} placeholder="e.g. 100" value={formData.hip} onChange={e => updateForm('hip', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        {label('Waist-to-Hip Ratio')}
                        <input type="text" className={calcCls} value={calcWHR()} disabled />
                    </div>
                </div>
            );
            case 2: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            {label('Systolic BP (mmHg)', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 130" value={formData.sbp} onChange={e => updateForm('sbp', e.target.value)} />
                        </div>
                        <div>
                            {label('Diastolic BP (mmHg)')}
                            <input type="number" className={inputCls} placeholder="e.g. 85" value={formData.dbp} onChange={e => updateForm('dbp', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        {label('Hypertension Status', true)}
                        <div className="flex flex-col gap-3">
                            {renderOption('htnStatus', 'No hypertension', 'none')}
                            {renderOption('htnStatus', 'Controlled', 'controlled', '<140/90 on medication')}
                            {renderOption('htnStatus', 'Uncontrolled', 'uncontrolled', '≥140/90 on medication')}
                            {renderOption('htnStatus', 'Resistant', 'resistant', '≥3 medications')}
                        </div>
                    </div>
                    <div>
                        {label('On BP Medications?', true)}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('bpMeds', 'No', 'no')}
                            {renderOption('bpMeds', 'Yes', 'yes')}
                        </div>
                    </div>
                    {formData.bpMeds === 'yes' && (
                        <div className="animate-in fade-in duration-300">
                            {label('Number of BP Medications')}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {renderOption('bpNumMeds', '1', '1')}
                                {renderOption('bpNumMeds', '2', '2')}
                                {renderOption('bpNumMeds', '3+', '3')}
                            </div>
                        </div>
                    )}
                </div>
            );
            case 3: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            {label('Total Cholesterol (mg/dL)', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 200" value={formData.tc} onChange={e => updateForm('tc', e.target.value)} />
                        </div>
                        <div>
                            {label('LDL (mg/dL)')}
                            <input type="number" className={inputCls} placeholder="e.g. 120" value={formData.ldl} onChange={e => updateForm('ldl', e.target.value)} />
                        </div>
                        <div>
                            {label('HDL (mg/dL)', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 50" value={formData.hdl} onChange={e => updateForm('hdl', e.target.value)} />
                        </div>
                        <div>
                            {label('Triglycerides (mg/dL)')}
                            <input type="number" className={inputCls} placeholder="e.g. 150" value={formData.trig} onChange={e => updateForm('trig', e.target.value)} />
                        </div>
                    </div>
                </div>
            );
            case 4: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div>
                        {label('Diabetes Status', true)}
                        <div className="flex flex-col gap-3">
                            {renderOption('dmStatus', 'No Diabetes', 'none')}
                            {renderOption('dmStatus', 'Pre-diabetes', 'pre')}
                            {renderOption('dmStatus', 'Type 2 Diabetes', 't2dm')}
                            {renderOption('dmStatus', 'Type 1 Diabetes', 't1dm')}
                        </div>
                    </div>
                    {formData.dmStatus && formData.dmStatus !== 'none' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-300">
                            <div>
                                {label('HbA1c (%)')}
                                <input type="number" className={inputCls} placeholder="e.g. 6.5" value={formData.hba1c} onChange={e => updateForm('hba1c', e.target.value)} />
                            </div>
                            <div>
                                {label('Fasting Glucose (mg/dL)')}
                                <input type="number" className={inputCls} placeholder="e.g. 110" value={formData.fbg} onChange={e => updateForm('fbg', e.target.value)} />
                            </div>
                        </div>
                    )}
                </div>
            );
            case 5: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div>
                        {label('Prior Cardiovascular Event', true)}
                        {hint('Heart attack, stroke, bypass, stenting, angina')}
                        <div className="flex flex-col gap-3">
                            {renderOption('cvdHist', 'No prior CVD', 'none')}
                            {renderOption('cvdHist', 'Established CVD', 'yes')}
                        </div>
                    </div>
                    <div>
                        {label('Premature Family History of CVD', true)}
                        {hint('1st degree relative: Male <55 / Female <65')}
                        <div className="flex flex-col gap-3">
                            {renderOption('fhCvd', 'No / Unknown', 'no')}
                            {renderOption('fhCvd', 'Yes (1 relative)', '1')}
                            {renderOption('fhCvd', 'Yes (≥2 relatives)', '2')}
                        </div>
                    </div>
                </div>
            );
            case 6: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div>
                        {label('Smoking Status', true)}
                        <div className="flex flex-col gap-3">
                            {renderOption('smoking', 'Never smoked', 'never')}
                            {renderOption('smoking', 'Former smoker', 'former')}
                            {renderOption('smoking', 'Current smoker', 'current')}
                        </div>
                    </div>
                    <div>
                        {label('Alcohol Consumption', true)}
                        <div className="flex flex-col gap-3">
                            {renderOption('alcohol', 'None / Occasional', 'low')}
                            {renderOption('alcohol', 'Moderate (<14u/wk)', 'moderate')}
                            {renderOption('alcohol', 'Heavy (≥14u/wk)', 'heavy')}
                        </div>
                    </div>
                    <div>
                        {label('Physical Activity', true)}
                        {hint('Moderate intensity exercise per week')}
                        <div className="flex flex-col gap-3">
                            {renderOption('activity', 'Active (≥150 min/wk)', 'active')}
                            {renderOption('activity', 'Insufficient (<150 min/wk)', 'insufficient')}
                            {renderOption('activity', 'Sedentary', 'sedentary')}
                        </div>
                    </div>
                    <div>
                        {label('Diet Quality', true)}
                        <div className="flex flex-col gap-3">
                            {renderOption('diet', 'Healthy (Med/DASH)', 'healthy')}
                            {renderOption('diet', 'Average', 'average')}
                            {renderOption('diet', 'Poor (High fat/sugar)', 'poor')}
                        </div>
                    </div>
                </div>
            );
            case 7: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div>
                        {label('High-sensitivity CRP (mg/L)')}
                        {hint('Marker of systemic inflammation')}
                        <input type="number" className={inputCls} placeholder="e.g. 1.5" value={formData.crp} onChange={e => updateForm('crp', e.target.value)} />
                    </div>
                    <div>
                        {label('Estimated GFR (mL/min/1.73m²)')}
                        {hint('Renal function — >60 is normal')}
                        <input type="number" className={inputCls} placeholder="e.g. 90" value={formData.egfr} onChange={e => updateForm('egfr', e.target.value)} />
                    </div>
                    <div>
                        {label('Microalbuminuria')}
                        <div className="flex flex-col gap-3">
                            {renderOption('microalbumin', 'Negative / Normal', 'negative')}
                            {renderOption('microalbumin', 'Positive (30–300 mg/g)', 'positive')}
                        </div>
                    </div>
                </div>
            );
            case 8: return (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div>
                        {label('Left Ventricular Hypertrophy (LVH)')}
                        {hint('Determined via ECG or Echo')}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('lvh', 'No', 'no')}
                            {renderOption('lvh', 'Yes', 'yes')}
                        </div>
                    </div>
                    <div>
                        {label('Carotid Plaque / IMT >0.9mm')}
                        {hint('Determined via ultrasound')}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('plaque', 'No', 'no')}
                            {renderOption('plaque', 'Yes', 'yes')}
                        </div>
                    </div>
                    <div>
                        {label('Ankle-Brachial Index (ABI) <0.9')}
                        {hint('Indicator of peripheral artery disease')}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('abi', 'Normal (≥0.9)', 'normal')}
                            {renderOption('abi', 'Abnormal (<0.9)', 'abnormal')}
                        </div>
                    </div>
                </div>
            );
            default:
                return null;
        }
    };

    const section     = SECTIONS[currentStep];
    const progressPerc = Math.round(((currentStep + 1) / SECTIONS.length) * 100);

    /* ── Result scorecard ── */
    if (result) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container-wide py-12 sm:py-16">
                    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                                <HeartPulse className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="font-bold text-foreground tracking-tight" style={{ fontSize: 'var(--fz-h1)' }}>
                                Your CVITAL™ Score
                            </h1>
                            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed" style={{ fontSize: 'var(--fz-lg)' }}>
                                Based on your health data, we've generated your personalized cardiovascular intelligence profile.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                                {/* CVITAL Score */}
                                <div className="space-y-5">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-primary" />
                                        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Overall Vitality</p>
                                    </div>
                                    <div className="flex items-end gap-3 border-b border-border pb-6">
                                        <span className="text-7xl font-black leading-none tracking-tighter" style={{ color: result.cvitalTierDetails?.color || 'hsl(var(--primary))' }}>
                                            {result.cvitalScore}
                                        </span>
                                        <span className="text-xl text-muted-foreground font-medium mb-2">/ 100</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-wider mb-1.5" style={{ color: result.cvitalTierDetails?.color || 'hsl(var(--primary))' }}>
                                            {result.cvitalTierDetails?.label || result.cvitalTier} Profile
                                        </p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {result.cvitalTierDetails?.action || 'Review your lifestyle metrics to improve your score.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Risk & Vascular Age */}
                                <div className="space-y-8 md:pl-8 md:border-l border-border">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Heart className="w-4 h-4 text-destructive" />
                                            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">10-Year ASCVD Risk</p>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-4xl font-black ${result.ascvdTier === 'high' ? 'text-destructive' : 'text-amber-500'}`}>
                                                {result.ascvdRisk != null ? `${result.ascvdRisk}%` : 'N/A'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-semibold">
                                            Risk Tier: <span className="text-foreground">{result.ascvdTier || 'Not Assessed'}</span>
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <User className="w-4 h-4 text-primary" />
                                            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Vascular Age</p>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-primary">{result.vascularAge}</span>
                                            <span className="text-muted-foreground font-medium text-sm">years old</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-semibold">
                                            Chronological: <span className="text-foreground">{formData.age} yrs</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => window.print()}
                                    className="px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
                                >
                                    Download Report
                                </button>
                                <button
                                    onClick={() => navigate('/account/dashboard')}
                                    className="group px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px flex items-center justify-center gap-2"
                                    style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                                >
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Main form ── */
    return (
        <div className="min-h-screen bg-background">

            {/* Sticky progress bar */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <span className="text-xs font-bold text-primary tracking-widest hidden sm:block whitespace-nowrap">
                        CVITAL™
                    </span>
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                            <span>
                                Section {currentStep + 1} of {SECTIONS.length}
                                <span className="hidden sm:inline"> — {section.title}</span>
                            </span>
                            <span className="font-semibold text-foreground">{progressPerc}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPerc}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-20">
                {/* Section header */}
                <div className="flex items-start sm:items-center mb-8 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-primary text-xs font-bold tracking-widest mb-1 uppercase">
                            Section 0{currentStep + 1}
                        </p>
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{section.title}</h2>
                        <p className="text-muted-foreground text-sm mt-0.5">{section.desc}</p>
                    </div>
                </div>

                {/* Step content */}
                <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
                    <div className="mb-8 min-h-[400px]">
                        {renderStep()}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-3 pt-5 border-t border-border">
                        <button
                            type="button"
                            onClick={currentStep === 0 ? skipAssessment : prevStep}
                            className="flex-1 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2"
                        >
                            {currentStep === 0 ? 'Skip' : (
                                <><ArrowLeft className="w-4 h-4" /> Back</>
                            )}
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all
                                ${isSubmitting
                                    ? 'opacity-50 cursor-not-allowed bg-primary text-primary-foreground'
                                    : 'text-primary-foreground hover:opacity-90 hover:-translate-y-px'
                                }`}
                            style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                        >
                            {currentStep === SECTIONS.length - 1 ? (
                                isSubmitting ? 'Calculating…' : 'Calculate Score'
                            ) : (
                                <> Continue <ArrowRight className="w-4 h-4" /> </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
