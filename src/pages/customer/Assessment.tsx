import React, { useState, useEffect } from 'react';
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
    { id: 1, icon: User, title: 'Personal Demographics', desc: 'Basic patient profile' },
    { id: 2, icon: Activity, title: 'Body Measurements', desc: 'Anthropometric data' },
    { id: 3, icon: Heart, title: 'Blood Pressure', desc: 'Hypertension status' },
    { id: 4, icon: TestTube, title: 'Lipid Profile', desc: 'Cholesterol levels' },
    { id: 5, icon: Droplets, title: 'Diabetes Assessment', desc: 'Blood sugar control' },
    { id: 6, icon: HeartPulse, title: 'CVD History', desc: 'Cardiovascular events' },
    { id: 7, icon: Footprints, title: 'Lifestyle Factors', desc: 'Habits and physical activity' },
    { id: 8, icon: FlaskConical, title: 'Advanced Biomarkers', desc: 'Inflammation & renal function' },
    { id: 9, icon: Stethoscope, title: 'Organ Assessment', desc: 'Target organ damage' }
];

export default function Assessment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, user } = useSelector((state: RootState) => state.auth);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null); // Added state for inline results

    // Basic Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        age: '',
        sex: '',
        menopause: '',
        race: '',
        country: '',
        height: '',
        weight: '',
        waist: '',
        hip: '',
        sbp: '',
        dbp: '',
        htnStatus: '',
        bpMeds: '',
        bpNumMeds: '',
        tc: '',
        ldl: '',
        hdl: '',
        trig: '',
        dmStatus: '',
        hba1c: '',
        fbg: '',
        cvdHist: '',
        fhCvd: '',
        smoking: '',
        alcohol: '',
        activity: '',
        diet: '',
        crp: '',
        egfr: '',
        microalbumin: '',
        lvh: '',
        plaque: '',
        abi: ''
    });

    const updateForm = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

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
        let isValid = true;
        switch (currentStep) {
            case 0:
                if (!formData.age || !formData.sex || !formData.race) isValid = false;
                break;
            case 1:
                if (!formData.height || !formData.weight || !formData.waist) isValid = false;
                break;
            case 2:
                if (!formData.sbp || !formData.htnStatus || !formData.bpMeds) isValid = false;
                break;
            case 3:
                if (!formData.tc || !formData.hdl) isValid = false;
                break;
            case 4:
                if (!formData.dmStatus) isValid = false;
                break;
            case 5:
                if (!formData.cvdHist || !formData.fhCvd) isValid = false;
                break;
            case 6:
                if (!formData.smoking || !formData.alcohol || !formData.activity || !formData.diet) isValid = false;
                break;
        }

        if (!isValid) {
            toast.error('Please fill out all required fields marked with * before continuing.');
        }
        return isValid;
    };

    const nextStep = async () => {
        if (!validateStep()) return;

        if (currentStep < SECTIONS.length - 1) {
            setCurrentStep(curr => curr + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            await submitAssessment();
        }
    };

    const submitAssessment = async () => {
        if (!token) {
            toast.error("You must be logged in to save assessment results.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/vitals/calculate-score', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const scoreData = response.data.data;
            toast.success("Assessment completed successfully!");

            // Set the result to show inline scorecard
            setResult(scoreData);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to calculate assessment score.");
            navigate('/account/dashboard');
        } finally {
            setIsSubmitting(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const skipAssessment = async () => {
        if (token && user) {
            const updatedProfile = { ...(user.profile || {}), healthScore: -1 };
            const updatedUser = { ...user, profile: updatedProfile };

            try {
                await axios.put('/api/users/profile/onboarding', { healthScore: -1 }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(setCredentials({ user: updatedUser, token }));
            } catch (e) {
                console.warn('Could not sync skip status to backend', e);
            }
        }
        navigate('/account/dashboard');
    };

    const renderOption = (key: string, label: string, value: string, sublabel?: string) => {
        const isSelected = formData[key as keyof typeof formData] === value;
        return (
            <button
                type="button"
                onClick={() => updateForm(key, value)}
                className={`flex w-full sm:w-auto items-center text-left transition-all duration-200 border-2 rounded-xl p-4 mb-3 sm:mb-0 sm:mr-3 flex-1 
                    ${isSelected
                        ? 'border-accent bg-accent/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
            >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0
                    ${isSelected ? 'border-accent bg-accent' : 'border-white/20'}`}
                >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                </div>
                <div>
                    <div className={`text-sm ${isSelected ? 'font-semibold text-white' : 'text-slate-200'}`}>
                        {label}
                    </div>
                    {sublabel && (
                        <div className="text-xs text-slate-400 mt-1">{sublabel}</div>
                    )}
                </div>
            </button>
        );
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Age <span className="text-red-400">*</span></label>
                            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="e.g. 45" value={formData.age} onChange={(e) => updateForm('age', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Biological Sex <span className="text-red-400">*</span></label>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-3">
                                {renderOption('sex', 'Male', 'male')}
                                {renderOption('sex', 'Female', 'female')}
                            </div>
                        </div>
                        {formData.sex === 'female' && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-1">Menopausal Status</label>
                                <p className="text-xs text-slate-400 mb-3">Females only — affects risk stratification</p>
                                <div className="flex flex-col sm:flex-row gap-0 sm:gap-3">
                                    {renderOption('menopause', 'Pre-menopausal', 'pre')}
                                    {renderOption('menopause', 'Post-menopausal', 'post', 'Increases cardiovascular risk')}
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Ethnicity <span className="text-red-400">*</span></label>
                            <div className="flex flex-col gap-0">
                                {renderOption('race', 'White / South Asian / Other', 'white')}
                                {renderOption('race', 'African / Afro-Caribbean', 'black')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Country of Residence</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="e.g. India, UK, USA" value={formData.country} onChange={(e) => updateForm('country', e.target.value)} />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Height (cm) <span className="text-red-400">*</span></label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="e.g. 170" value={formData.height} onChange={(e) => updateForm('height', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Weight (kg) <span className="text-red-400">*</span></label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="e.g. 75" value={formData.weight} onChange={(e) => updateForm('weight', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">BMI (auto-calculated)</label>
                            <input type="text" className="w-full bg-accent/10 border border-accent/30 text-accent font-semibold rounded-xl px-5 py-4 cursor-not-allowed" value={calcBMI()} disabled />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Waist (cm) <span className="text-red-400">*</span></label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="e.g. 90" value={formData.waist} onChange={(e) => updateForm('waist', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Hip (cm)</label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="e.g. 100" value={formData.hip} onChange={(e) => updateForm('hip', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Waist-to-Hip Ratio</label>
                            <input type="text" className="w-full bg-accent/10 border border-accent/30 text-accent font-semibold rounded-xl px-5 py-4 cursor-not-allowed" value={calcWHR()} disabled />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Systolic BP <span className="text-red-400">*</span></label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 130" value={formData.sbp} onChange={(e) => updateForm('sbp', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Diastolic BP</label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 85" value={formData.dbp} onChange={(e) => updateForm('dbp', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Hypertension Status <span className="text-red-400">*</span></label>
                            <div className="flex flex-col gap-0">
                                {renderOption('htnStatus', 'No hypertension', 'none')}
                                {renderOption('htnStatus', 'Controlled', 'controlled', '<140/90 on med')}
                                {renderOption('htnStatus', 'Uncontrolled', 'uncontrolled', '≥140/90 on med')}
                                {renderOption('htnStatus', 'Resistant', 'resistant', '≥3 meds')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">On BP Medications? <span className="text-red-400">*</span></label>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-3">
                                {renderOption('bpMeds', 'No', 'no')}
                                {renderOption('bpMeds', 'Yes', 'yes')}
                            </div>
                        </div>
                        {formData.bpMeds === 'yes' && (
                            <div className="animate-in fade-in duration-300">
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Number of BP Medications</label>
                                <div className="flex flex-col sm:flex-row gap-0 sm:gap-3">
                                    {renderOption('bpNumMeds', '1', '1')}
                                    {renderOption('bpNumMeds', '2', '2')}
                                    {renderOption('bpNumMeds', '3+', '3')}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Total Cholesterol (mg/dL) <span className="text-red-400">*</span></label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 200" value={formData.tc} onChange={(e) => updateForm('tc', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">LDL (mg/dL)</label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 120" value={formData.ldl} onChange={(e) => updateForm('ldl', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">HDL (mg/dL) <span className="text-red-400">*</span></label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 50" value={formData.hdl} onChange={(e) => updateForm('hdl', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">Triglycerides (mg/dL)</label>
                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 150" value={formData.trig} onChange={(e) => updateForm('trig', e.target.value)} />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Diabetes Status <span className="text-red-400">*</span></label>
                            <div className="flex flex-col gap-0">
                                {renderOption('dmStatus', 'No Diabetes', 'none')}
                                {renderOption('dmStatus', 'Pre-diabetes', 'pre')}
                                {renderOption('dmStatus', 'Type 2 Diabetes', 't2dm')}
                                {renderOption('dmStatus', 'Type 1 Diabetes', 't1dm')}
                            </div>
                        </div>
                        {formData.dmStatus && formData.dmStatus !== 'none' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">HbA1c (%)</label>
                                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 6.5" value={formData.hba1c} onChange={(e) => updateForm('hba1c', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">Fasting Glucose (mg/dL)</label>
                                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 110" value={formData.fbg} onChange={(e) => updateForm('fbg', e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Prior Cardiovascular Event <span className="text-red-400">*</span></label>
                            <p className="text-xs text-slate-400 mb-3">Heart attack, stroke, bypass, stenting, angina</p>
                            <div className="flex flex-col gap-0">
                                {renderOption('cvdHist', 'No prior CVD', 'none')}
                                {renderOption('cvdHist', 'Established CVD', 'yes')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Premature Family History of CVD <span className="text-red-400">*</span></label>
                            <p className="text-xs text-slate-400 mb-3">1st degree relative: Male {'<'}55 / Female {'<'}65</p>
                            <div className="flex flex-col gap-0">
                                {renderOption('fhCvd', 'No / Unknown', 'no')}
                                {renderOption('fhCvd', 'Yes (1 relative)', '1')}
                                {renderOption('fhCvd', 'Yes (≥2 relatives)', '2')}
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Smoking Status <span className="text-red-400">*</span></label>
                            <div className="flex flex-col gap-0">
                                {renderOption('smoking', 'Never smoked', 'never')}
                                {renderOption('smoking', 'Former smoker', 'former')}
                                {renderOption('smoking', 'Current smoker', 'current')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Alcohol Consumption <span className="text-red-400">*</span></label>
                            <div className="flex flex-col gap-0">
                                {renderOption('alcohol', 'None / Occasional', 'low')}
                                {renderOption('alcohol', 'Moderate (<14u/wk)', 'moderate')}
                                {renderOption('alcohol', 'Heavy (≥14u/wk)', 'heavy')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Physical Activity <span className="text-red-400">*</span></label>
                            <p className="text-xs text-slate-400 mb-3">Moderate intensity exercise per week</p>
                            <div className="flex flex-col gap-0">
                                {renderOption('activity', 'Active (≥150 min/wk)', 'active')}
                                {renderOption('activity', 'Insufficient (<150 min/wk)', 'insufficient')}
                                {renderOption('activity', 'Sedentary', 'sedentary')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Diet Quality <span className="text-red-400">*</span></label>
                            <div className="flex flex-col gap-0">
                                {renderOption('diet', 'Healthy (Med/DASH)', 'healthy')}
                                {renderOption('diet', 'Average', 'average')}
                                {renderOption('diet', 'Poor (High fat/sugar)', 'poor')}
                            </div>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">High-sensitivity CRP (mg/L)</label>
                            <p className="text-xs text-slate-400 mb-3">Marker of systemic inflammation</p>
                            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 1.5" value={formData.crp} onChange={(e) => updateForm('crp', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Estimated GFR (mL/min/1.73m²)</label>
                            <p className="text-xs text-slate-400 mb-3">Renal function {'>'}60 is normal</p>
                            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="e.g. 90" value={formData.egfr} onChange={(e) => updateForm('egfr', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">Microalbuminuria</label>
                            <div className="flex flex-col gap-0">
                                {renderOption('microalbumin', 'Negative / Normal', 'negative')}
                                {renderOption('microalbumin', 'Positive (30-300 mg/g)', 'positive')}
                            </div>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Left Ventricular Hypertrophy (LVH)</label>
                            <p className="text-xs text-slate-400 mb-3">Determined via ECG or Echo</p>
                            <div className="flex flex-col gap-0">
                                {renderOption('lvh', 'No', 'no')}
                                {renderOption('lvh', 'Yes', 'yes')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Carotid Plaque / IMT {'>'}0.9mm</label>
                            <p className="text-xs text-slate-400 mb-3">Determined via ultrasound</p>
                            <div className="flex flex-col gap-0">
                                {renderOption('plaque', 'No', 'no')}
                                {renderOption('plaque', 'Yes', 'yes')}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-1">Ankle-Brachial Index (ABI) {'<'}0.9</label>
                            <p className="text-xs text-slate-400 mb-3">Indicator of peripheral artery disease</p>
                            <div className="flex flex-col gap-0">
                                {renderOption('abi', 'Normal (≥0.9)', 'normal')}
                                {renderOption('abi', 'Abnormal (<0.9)', 'abnormal')}
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="text-white">Section not implemented</div>;
        }
    };

    const section = SECTIONS[currentStep];
    const progressPerc = Math.round(((currentStep + 1) / SECTIONS.length) * 100);

    // If result exists, render the Scorecard instead of the form
    if (result) {
        return (
            <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20 py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6 border border-accent/30 shadow-[0_0_30px_rgba(16,217,138,0.2)]">
                            <HeartPulse className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">Your CVITAL™ Score</h1>
                        <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
                            Based on your health data, we've generated your personalized cardiovascular intelligence profile.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            {/* CVITAL Score Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-accent" />
                                    <h3 className="text-sm font-bold tracking-widest text-slate-300 uppercase">Overall Vitality</h3>
                                </div>
                                <div className="flex items-end gap-3 border-b border-white/10 pb-8">
                                    <span className="text-7xl font-black text-white leading-none tracking-tighter shadow-sm" style={{ color: result.cvitalTierDetails?.color || '#10d98a' }}>
                                        {result.cvitalScore}
                                    </span>
                                    <span className="text-xl text-slate-400 font-medium mb-2">/ 100</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: result.cvitalTierDetails?.color || '#10d98a' }}>
                                        {result.cvitalTierDetails?.label || result.cvitalTier} Profile
                                    </p>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {result.cvitalTierDetails?.action || "Review your lifestyle metrics to improve your score."}
                                    </p>
                                </div>
                            </div>

                            {/* Risk & Vascular Age Section */}
                            <div className="space-y-8 md:pl-8 md:border-l border-white/10">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Heart className="w-5 h-5 text-rose-400" />
                                        <h3 className="text-sm font-bold tracking-widest text-slate-300 uppercase">10-Year ASCVD Risk</h3>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-black ${result.ascvdTier === 'high' ? 'text-rose-400' : 'text-amber-400'}`}>
                                            {result.ascvdRisk != null ? `${result.ascvdRisk}%` : 'N/A'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-semibold">
                                        Risk Tier: <span className="text-white">{result.ascvdTier || 'Not Assessed'}</span>
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <User className="w-5 h-5 text-blue-400" />
                                        <h3 className="text-sm font-bold tracking-widest text-slate-300 uppercase">Vascular Age</h3>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-blue-400">
                                            {result.vascularAge}
                                        </span>
                                        <span className="text-slate-400 font-medium text-sm">years old</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-semibold">
                                        Chronological: <span className="text-white">{formData.age} yrs</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Next Steps Buttons */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.print()}
                                className="px-8 py-4 rounded-xl border-2 border-white/10 text-white font-bold hover:bg-white/5 transition-colors focus:outline-none"
                            >
                                Download Report
                            </button>
                            <button
                                onClick={() => navigate('/account/dashboard')}
                                className="px-8 py-4 rounded-xl bg-gradient-to-br from-accent to-[#0ab87a] text-slate-900 font-bold hover:shadow-[0_0_20px_rgba(16,217,138,0.3)] transition-all flex items-center justify-center gap-2"
                            >
                                Return to Dashboard <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
            {/* Header / Progress Bar */}
            <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 py-4 sm:px-8">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4 w-full">
                        <div className="text-accent font-bold tracking-widest hidden sm:block min-w-max">
                            🫀 CVITAL™
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-2">
                                <span>Section {currentStep + 1} of {SECTIONS.length} <span className="hidden sm:inline-block">— {section.title}</span></span>
                                <span>{progressPerc}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-500 ease-out"
                                    style={{ width: `${progressPerc}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
                {/* Section Header */}
                <div className="flex items-start sm:items-center mb-10 pb-8 border-b border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mr-5 flex-shrink-0">
                        <section.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <div className="text-accent text-xs font-bold tracking-widest mb-1.5 uppercase">
                            Section 0{currentStep + 1}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{section.title}</h2>
                        <p className="text-slate-400 text-sm">{section.desc}</p>
                    </div>
                </div>

                {/* Form Step */}
                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                    <div className="mb-10 min-h-[400px]">
                        {renderStep()}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <button
                            type="button"
                            onClick={currentStep === 0 ? skipAssessment : prevStep}
                            className="flex-1 py-4 rounded-xl border-2 border-white/20 text-slate-200 font-bold hover:bg-white/5 transition-colors focus:outline-none"
                        >
                            {currentStep === 0 ? 'Skip' : 'Back'}
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-accent/20 
                                ${isSubmitting ? 'bg-accent/50 text-slate-700 cursor-not-allowed' : 'bg-gradient-to-br from-accent to-[#0ab87a] text-slate-900'}
                            `}
                        >
                            {currentStep === SECTIONS.length - 1 ? (
                                isSubmitting ? 'Calculating...' : 'Calculate Score'
                            ) : (
                                <>
                                    <span className="mr-2">Continue</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
