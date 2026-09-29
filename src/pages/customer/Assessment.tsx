import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCredentials } from '@/store';
import axios from 'axios';
import {
    User, Activity, Heart, TestTube, Droplets,
    HeartPulse, Footprints, FlaskConical, Stethoscope,
    ArrowRight, ArrowLeft, CheckCircle2, Sparkles
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

const inputCls = 'w-full bg-muted/30 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm md:text-base hover:border-primary/30';
const calcCls  = 'w-full bg-primary/5 border border-primary/20 text-primary font-semibold rounded-xl px-4 py-3 cursor-not-allowed text-sm md:text-base shadow-inner';

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
        mac: '', neck: '', bodyFat: '',
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

    const calcBodyFat = () => {
        const h = parseFloat(formData.height);
        const w = parseFloat(formData.waist);
        const n = parseFloat(formData.neck);
        const hip = parseFloat(formData.hip);
        const isFemale = formData.sex === 'female';

        if (!h || !w || !n || (isFemale && !hip)) return '';

        let bf = 0;
        if (isFemale) {
            // US Navy Female formula (cm)
            bf = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
        } else {
            // US Navy Male formula (cm)
            bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
        }
        return bf > 0 ? bf.toFixed(1) : '0.0';
    };

    const validateStep = () => {
        let valid = true;
        switch (currentStep) {
            case 0: if (!formData.age || !formData.sex) valid = false; break;
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
            const calculatedBF = calcBodyFat();
            const submissionData = { ...formData, bodyFat: formData.bodyFat || calculatedBF };
            await submitAssessment(submissionData);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(c => c - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const submitAssessment = async (submissionData: any) => {
        if (!token) { toast.error('You must be logged in to save assessment results.'); return; }
        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/vitals/calculate-score', submissionData, {
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

    /* ── Option button (compact) ── */
    const renderOption = (key: string, label: string, value: string, sublabel?: string) => {
        const selected = formData[key as keyof typeof formData] === value;
        return (
            <button
                type="button"
                onClick={() => updateForm(key, value)}
                className={`flex w-full items-center text-left transition-all duration-300 border rounded-xl p-3 flex-1 group relative overflow-hidden
                    ${selected
                        ? 'border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-[1.01] ring-1 ring-primary/50'
                        : 'border-border/50 bg-muted/20 hover:border-primary/30 hover:bg-muted/40'
                    }`}
            >
                {selected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                )}
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 relative z-10
                    ${selected ? 'border-primary bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'border-muted-foreground/30 group-hover:border-primary/50 bg-background/50'}`}>
                    {selected && <div className="w-1.5 h-1.5 rounded-full bg-white animate-in zoom-in duration-200" />}
                </div>
                <div className="relative z-10 flex-1">
                    <div className={`text-sm font-medium transition-colors ${selected ? 'text-foreground font-semibold' : 'text-foreground/80 group-hover:text-foreground'}`}>
                        {label}
                    </div>
                    {sublabel && <div className={`text-[10px] mt-0.5 transition-colors leading-tight ${selected ? 'text-primary/80' : 'text-muted-foreground group-hover:text-muted-foreground/80'}`}>{sublabel}</div>}
                </div>
                {selected && (
                    <CheckCircle2 className="w-4 h-4 text-primary opacity-50 absolute right-3 z-10" />
                )}
            </button>
        );
    };

    const label = (text: string, required = false) => (
        <label className="block text-sm font-semibold text-foreground/90 mb-1.5 ml-1">
            {text} {required && <span className="text-destructive animate-pulse">*</span>}
        </label>
    );

    const hint = (text: string) => <p className="text-[11px] text-muted-foreground/70 mb-2 ml-1 leading-tight">{text}</p>;

    /* ── Form steps ── */
    const renderStep = () => {
        switch (currentStep) {
            case 0: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="group">
                            {label('Age', true)}
                            <input type="number" className={inputCls} placeholder="e.g. 45" value={formData.age} onChange={e => updateForm('age', e.target.value)} />
                        </div>
                        <div className="group">
                            {label('Country of Residence')}
                            <input type="text" className={inputCls} placeholder="e.g. India, UK, USA" value={formData.country} onChange={e => updateForm('country', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        {label('Biological Sex', true)}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('sex', 'Male', 'male')}
                            {renderOption('sex', 'Female', 'female')}
                            {renderOption('sex', 'Prefer not to say', 'other', 'ASCVD 10-year risk won’t be available')}
                        </div>
                    </div>
                    {formData.sex === 'female' && (
                        <div className="animate-in fade-in zoom-in-95 duration-300">
                            {label('Menopausal Status')}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {renderOption('menopause', 'Pre-menopausal', 'pre')}
                                {renderOption('menopause', 'Post-menopausal', 'post', 'Increases risk')}
                            </div>
                        </div>
                    )}
                </div>
            );
            case 1: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            {label('Height (cm)', true)}
                            <input type="number" className={inputCls} placeholder="170" value={formData.height} onChange={e => updateForm('height', e.target.value)} />
                        </div>
                        <div>
                            {label('Weight (kg)', true)}
                            <input type="number" className={inputCls} placeholder="75" value={formData.weight} onChange={e => updateForm('weight', e.target.value)} />
                        </div>
                        <div>
                            {label('BMI (Auto)')}
                            <input type="text" className={calcCls} value={calcBMI()} disabled />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            {label('Waist (cm)', true)}
                            <input type="number" className={inputCls} placeholder="90" value={formData.waist} onChange={e => updateForm('waist', e.target.value)} />
                        </div>
                        <div>
                            {label('Hip (cm)')}
                            <input type="number" className={inputCls} placeholder="100" value={formData.hip} onChange={e => updateForm('hip', e.target.value)} />
                        </div>
                        <div>
                            {label('W/H Ratio (Auto)')}
                            <input type="text" className={calcCls} value={calcWHR()} disabled />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            {label('Neck (cm)')}
                            <input type="number" className={inputCls} placeholder="38" value={formData.neck} onChange={e => updateForm('neck', e.target.value)} />
                        </div>
                        <div>
                            {label('Body Fat % (Auto)')}
                            <input type="text" className={calcCls} value={calcBodyFat()} disabled />
                        </div>
                        <div>
                            {label('Override BF %')}
                            <input type="number" className={inputCls} placeholder="e.g. 15" value={formData.bodyFat} onChange={e => updateForm('bodyFat', e.target.value)} />
                        </div>
                    </div>
                </div>
            );
            case 2: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {renderOption('htnStatus', 'No hypertension', 'none')}
                            {renderOption('htnStatus', 'Controlled', 'controlled')}
                            {renderOption('htnStatus', 'Uncontrolled', 'uncontrolled')}
                            {renderOption('htnStatus', 'Resistant', 'resistant')}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            {label('On BP Medications?', true)}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {renderOption('bpMeds', 'No', 'no')}
                                {renderOption('bpMeds', 'Yes', 'yes')}
                            </div>
                        </div>
                        {formData.bpMeds === 'yes' && (
                            <div className="animate-in fade-in zoom-in-95 duration-300">
                                {label('Number of Meds')}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {renderOption('bpNumMeds', '1', '1')}
                                    {renderOption('bpNumMeds', '2', '2')}
                                    {renderOption('bpNumMeds', '3+', '3')}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
            case 3: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div>
                        {label('Diabetes Status', true)}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {renderOption('dmStatus', 'No Diabetes', 'none')}
                            {renderOption('dmStatus', 'Pre-diabetes', 'pre')}
                            {renderOption('dmStatus', 'Type 2 Diabetes', 't2dm')}
                            {renderOption('dmStatus', 'Type 1 Diabetes', 't1dm')}
                        </div>
                    </div>
                    {formData.dmStatus && formData.dmStatus !== 'none' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
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
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div>
                        {label('Prior Cardiovascular Event', true)}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('cvdHist', 'No prior CVD', 'none')}
                            {renderOption('cvdHist', 'Established CVD', 'yes')}
                        </div>
                    </div>
                    <div>
                        {label('Premature Family History of CVD', true)}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {renderOption('fhCvd', 'No / Unknown', 'no')}
                            {renderOption('fhCvd', 'Yes (1 relative)', '1')}
                            {renderOption('fhCvd', 'Yes (≥2 relatives)', '2')}
                        </div>
                    </div>
                </div>
            );
            case 6: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div>
                        {label('Smoking Status', true)}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {renderOption('smoking', 'Never smoked', 'never')}
                            {renderOption('smoking', 'Former smoker', 'former')}
                            {renderOption('smoking', 'Current smoker', 'current')}
                        </div>
                    </div>
                    <div>
                        {label('Alcohol Consumption', true)}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {renderOption('alcohol', 'None / Occasional', 'low')}
                            {renderOption('alcohol', 'Moderate (<14u/wk)', 'moderate')}
                            {renderOption('alcohol', 'Heavy (≥14u/wk)', 'heavy')}
                        </div>
                    </div>
                    <div>
                        {label('Physical Activity', true)}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {renderOption('activity', 'Active (≥150 min/wk)', 'active')}
                            {renderOption('activity', 'Insufficient', 'insufficient')}
                            {renderOption('activity', 'Sedentary', 'sedentary')}
                        </div>
                    </div>
                    <div>
                        {label('Diet Quality', true)}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {renderOption('diet', 'Healthy (Med/DASH)', 'healthy')}
                            {renderOption('diet', 'Average', 'average')}
                            {renderOption('diet', 'Poor', 'poor')}
                        </div>
                    </div>
                </div>
            );
            case 7: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            {label('High-sensitivity CRP (mg/L)')}
                            <input type="number" className={inputCls} placeholder="e.g. 1.5" value={formData.crp} onChange={e => updateForm('crp', e.target.value)} />
                        </div>
                        <div>
                            {label('Estimated GFR')}
                            <input type="number" className={inputCls} placeholder="e.g. 90" value={formData.egfr} onChange={e => updateForm('egfr', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        {label('Microalbuminuria')}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('microalbumin', 'Negative / Normal', 'negative')}
                            {renderOption('microalbumin', 'Positive (30–300 mg/g)', 'positive')}
                        </div>
                    </div>
                </div>
            );
            case 8: return (
                <div className="space-y-5 animate-in slide-in-from-right-8 fade-in duration-500">
                    <div>
                        {label('Left Ventricular Hypertrophy (LVH)')}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('lvh', 'No', 'no')}
                            {renderOption('lvh', 'Yes', 'yes')}
                        </div>
                    </div>
                    <div>
                        {label('Carotid Plaque / IMT >0.9mm')}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {renderOption('plaque', 'No', 'no')}
                            {renderOption('plaque', 'Yes', 'yes')}
                        </div>
                    </div>
                    <div>
                        {label('Ankle-Brachial Index (ABI) <0.9')}
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
        // Derived data to match mobile app details
        const patientName = user?.name || formData.name || 'User';
        const patientAge = formData.age || '—';
        const patientSex = formData.sex ? (formData.sex.charAt(0).toUpperCase() + formData.sex.slice(1)) : 'Individual';
        
        const bf = parseFloat(formData.bodyFat || calcBodyFat()) || 0;
        const weight = parseFloat(formData.weight) || 0;
        const height = parseFloat(formData.height) || 0;
        const bmi = height > 0 ? (weight / Math.pow(height / 100, 2)).toFixed(1) : '—';
        
        let bfCat = { lbl: 'Pending', col: '#94A3B8' };
        if (bf > 0) {
            const isFemale = formData.sex === 'female';
            const categories = isFemale 
                ? [{lbl:'Essential',min:0,max:14,col:'#F59E0B'},{lbl:'Healthy',min:14,max:25,col:'#10B981'},{lbl:'Overfat',min:25,max:32,col:'#FB923C'},{lbl:'Obese',min:32,max:60,col:'#EF4444'}]
                : [{lbl:'Essential',min:0,max:6,col:'#F59E0B'},{lbl:'Healthy',min:6,max:18,col:'#10B981'},{lbl:'Overfat',min:18,max:26,col:'#FB923C'},{lbl:'Obese',min:26,max:60,col:'#EF4444'}];
            bfCat = categories.find(c => bf >= c.min && bf < c.max) || categories[1];
            if (bf >= 60) bfCat = categories[3];
        }

        const fatMass = weight && bf ? (weight * (bf / 100)).toFixed(1) : '—';
        const leanMass = weight && bf ? (weight - parseFloat(fatMass)).toFixed(1) : '—';

        const tierColor = result.cvitalTierDetails?.color || 'hsl(var(--primary))';
        const ascvdAvailable = result.ascvdRisk != null;
        const ascvdRisk = ascvdAvailable ? result.ascvdRisk : null;
        
        const ascvdStatus = !ascvdAvailable ? { lbl: 'NOT AVAILABLE', col: '#94A3B8', bg: '#94A3B820' }
            : ascvdRisk >= 20 ? { lbl: 'HIGH RISK', col: '#EF4444', bg: '#EF444420' }
            : ascvdRisk >= 7.5 ? { lbl: 'INTERMEDIATE', col: '#F59E0B', bg: '#F59E0B20' }
            : ascvdRisk >= 5 ? { lbl: 'BORDERLINE', col: '#F97316', bg: '#F9731620' }
            : { lbl: 'LOW RISK', col: '#10B981', bg: '#10B98120' };

        const managementPlan = [
            { id: 1, title: 'WELLNESS CHECK-INS', value: result.cvitalTierDetails?.reviewInterval || 'Routine checkup', icon: <Activity className="w-4 h-4" />, color: '#EF4444' },
            { id: 2, title: 'PREVENTIVE GUIDANCE', value: !ascvdAvailable ? 'Add biological sex' : (ascvdRisk >= 7.5 ? 'Consult physician' : 'Standard approach'), icon: <HeartPulse className="w-4 h-4" />, color: '#F59E0B' },
            { id: 3, title: 'LIFESTYLE', value: 'Supervised plan', icon: <Footprints className="w-4 h-4" />, color: '#10B981' },
            { id: 4, title: 'BIOMARKER REVIEW', value: 'Quarterly', icon: <FlaskConical className="w-4 h-4" />, color: '#3B82F6' }
        ];

        return (
            <div className="min-h-screen bg-background relative overflow-hidden py-12 sm:py-20">
                {/* Background ambient glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="container max-w-4xl mx-auto relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    
                    {/* Header */}
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                            ASSESSMENT RESULTS
                        </h1>
                    </div>

                    {/* Patient Info Card */}
                    <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 flex items-center shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-5">
                            <User className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-foreground">{patientName}</h2>
                            <p className="text-muted-foreground text-sm font-medium mt-1">
                                {patientAge} years • {patientSex} • BMI: {bmi} kg/m²
                            </p>
                        </div>
                        <div className="text-right bg-muted/40 px-4 py-2 rounded-xl hidden sm:block">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Report Date</p>
                            <p className="text-sm font-bold text-foreground mt-0.5">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* VITAL SCORE CARD */}
                        <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                <span className="font-bold text-sm tracking-wide text-foreground">VITAL SCORE™</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center mb-8">
                                <div className="w-40 h-40 rounded-full border-[10px] border-muted/30 flex flex-col items-center justify-center shadow-inner relative bg-background">
                                    <span className="text-5xl font-black text-foreground">{result.cvitalScore}</span>
                                    <span className="text-xs font-bold uppercase mt-1" style={{ color: tierColor }}>
                                        {result.cvitalTierDetails?.label || result.cvitalTier}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: `${tierColor}15` }}>
                                <Sparkles className="w-5 h-5 mt-0.5 shrink-0" style={{ color: tierColor }} />
                                <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--foreground)' }}>
                                    {result.cvitalTierDetails?.action}
                                </p>
                            </div>
                        </div>

                        {/* PREVENT SCORES CARD */}
                        <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                <Heart className="w-5 h-5 text-red-500" />
                                <span className="font-bold text-sm tracking-wide text-red-500">PREVENT SCORES</span>
                            </div>
                            
                            <div className="flex bg-muted/40 rounded-full p-1 mb-8">
                                <div className="flex-1 text-center py-2 bg-background rounded-full shadow-sm text-xs font-bold text-foreground">ASCVD</div>
                                <div className="flex-1 text-center py-2 text-xs font-bold text-muted-foreground">Total CVD</div>
                            </div>

                            <div className="flex justify-between items-center mb-8 px-4">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-muted-foreground mb-1">10-YR RISK</p>
                                    <p className="text-4xl font-black text-foreground">
                                        {ascvdAvailable ? ascvdRisk : 'N/A'}{ascvdAvailable && <span className="text-xl">%</span>}
                                    </p>
                                </div>
                                <div className="w-px h-12 bg-border/50" />
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-muted-foreground mb-1">30-YR RISK</p>
                                    <p className="text-4xl font-black text-foreground">
                                        {ascvdAvailable && result.ascvdRisk30Year > 0 ? result.ascvdRisk30Year : '--'}{ascvdAvailable && result.ascvdRisk30Year > 0 && <span className="text-xl">%</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center mt-auto">
                                <p className="text-[10px] font-bold text-muted-foreground mb-3 uppercase">
                                    {ascvdAvailable ? 'AHA PREVENT-ALIGNED' : 'REQUIRES BIOLOGICAL SEX'}
                                </p>
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ backgroundColor: ascvdStatus.bg }}>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ascvdStatus.col }} />
                                    <span className="text-[10px] font-bold" style={{ color: ascvdStatus.col }}>{ascvdStatus.lbl}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* BODY FAT PERCENTAGE */}
                        <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left md:border-r border-border/50 md:pr-8">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                    <User className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs font-bold text-emerald-500">BODY FAT %</span>
                                </div>
                                <p className="text-4xl font-black text-foreground mb-2">{bf}<span className="text-2xl">%</span></p>
                                <div className="inline-flex items-center px-3 py-1 rounded-full" style={{ backgroundColor: `${bfCat.col}20` }}>
                                    <span className="text-[10px] font-bold uppercase" style={{ color: bfCat.col }}>{bfCat.lbl}</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-muted-foreground">FAT MASS</span>
                                    <span className="text-sm font-bold text-foreground">{fatMass} kg</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-muted-foreground">LEAN MASS</span>
                                    <span className="text-sm font-bold text-foreground">{leanMass} kg</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-muted-foreground">BMI</span>
                                    <span className="text-sm font-bold text-foreground">{bmi}</span>
                                </div>
                            </div>
                        </div>

                        {/* VASCULAR AGE */}
                        <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-6">
                                <Activity className="w-5 h-5 text-amber-500" />
                                <span className="text-xs font-bold text-foreground">PREVENT-Age™</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <p className="text-5xl font-black text-foreground shrink-0">{result.vascularAge} <span className="text-2xl">yrs</span></p>
                                <div className="border-l border-border/50 pl-6 flex-1">
                                    <p className="text-sm text-muted-foreground mb-1">Chronological: <span className="font-bold text-foreground">{patientAge} yrs</span></p>
                                    {result.vascularAge > parseInt(patientAge || '0') && (
                                        <p className="text-xs text-red-500 font-medium leading-snug">
                                            Vascular system is ageing <span className="font-bold">{result.vascularAge - parseInt(patientAge || '0')} years faster</span> than biological age.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HEALTH INSIGHTS SUMMARY */}
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <h3 className="text-xs font-bold text-blue-500">HEALTH INSIGHTS SUMMARY</h3>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed text-foreground/80 mb-6">
                            <span className="font-bold text-foreground">{patientName}</span>, {patientAge}-year-old {patientSex.toLowerCase()}, presents with a 
                            <span className="font-bold" style={{ color: tierColor }}> VITAL Score™ of {result.cvitalScore} ({result.cvitalTierDetails?.label.toUpperCase()})</span>
                            {ascvdAvailable 
                                ? <span> and a <span className="font-bold">PREVENT ASCVD risk of {ascvdRisk}% (10-year)</span>. </span>
                                : <span>. PREVENT ASCVD score is not available without biological sex. </span>
                            }
                            Your vascular age is estimated at <span className="font-bold text-foreground">{result.vascularAge} years</span>.
                        </p>
                        
                        <button onClick={() => navigate('/account/dashboard')} className="w-full sm:w-auto bg-blue-500/10 hover:bg-blue-500/20 transition-colors border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between gap-4 text-left group">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="flex-1 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                                Join our <span className="font-bold">Wellness Program</span> to proactively lower your risk and reverse vascular aging!
                            </p>
                            <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* MONITORING & MANAGEMENT PLAN */}
                    <div>
                        <h3 className="text-[10px] font-bold text-muted-foreground mb-4 ml-2">MONITORING & MANAGEMENT PLAN</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {managementPlan.map(plan => (
                                <div key={plan.id} className="bg-card border border-border/50 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div style={{ color: plan.color }}>{plan.icon}</div>
                                        <span className="text-[9px] font-bold" style={{ color: plan.color }}>{plan.title}</span>
                                    </div>
                                    <p className="text-xs font-bold text-foreground leading-snug">{plan.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-12 pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => window.print()}
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-border/50 bg-muted/30 text-foreground font-semibold text-sm hover:bg-muted/60 transition-colors"
                        >
                            Download Report
                        </button>
                        <button
                            onClick={() => navigate('/account/dashboard')}
                            className="w-full sm:w-auto group px-10 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10">Save & Go to Dashboard</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    /* ── Main form ── */
    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/30">
            {/* Background subtle elements */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            {/* Sticky progress bar */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all shadow-sm">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                        <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-xs font-medium text-foreground/80">
                                <span className="text-primary font-bold mr-1">Step {currentStep + 1}</span> 
                                <span className="opacity-50">/ {SECTIONS.length}</span>
                                <span className="hidden sm:inline text-muted-foreground ml-2">— {section.title}</span>
                            </span>
                            <span className="font-bold text-foreground text-xs">{progressPerc}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)] relative"
                                style={{ width: `${progressPerc}%` }}
                            >
                                <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16 relative z-10">
                {/* Section header */}
                <div className="flex items-center mb-4 pb-4 border-b border-border/50 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center mr-4 flex-shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                        <section.icon className="w-6 h-6 text-primary relative z-10" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-1">{section.title}</h2>
                        <p className="text-muted-foreground text-xs md:text-sm">{section.desc}</p>
                    </div>
                </div>

                {/* Step content */}
                <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
                    <div className="mb-6 min-h-[200px]">
                        {renderStep()}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                        <button
                            type="button"
                            onClick={currentStep === 0 ? skipAssessment : prevStep}
                            className="flex-1 sm:flex-none sm:w-32 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 text-foreground font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-transparent hover:border-border"
                        >
                            {currentStep === 0 ? 'Skip' : (
                                <><ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back</>
                            )}
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-[2] sm:flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group shadow-md
                                ${isSubmitting
                                    ? 'opacity-70 cursor-not-allowed bg-muted text-muted-foreground shadow-none'
                                    : 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                                }`}
                        >
                            {!isSubmitting && (
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            )}
                            <span className="relative z-10">
                                {currentStep === SECTIONS.length - 1 ? (
                                    isSubmitting ? 'Calculating…' : 'Calculate Score'
                                ) : 'Continue'}
                            </span>
                            {!isSubmitting && currentStep !== SECTIONS.length - 1 && (
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
