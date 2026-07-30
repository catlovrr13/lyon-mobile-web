import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';

const emptyForm = { type: 'single', date: '', endDate: '', image: '', todo: '', time: '', place: '' };
export default function TravelPlanner() {
    const saved = JSON.parse(localStorage.getItem('travelPlanner') || '{}');

    const [plans, setPlans] = useState(saved.plans || []);
    const [mode, setMode] = useState(saved.mode || 'list');
    const [editingId, setEditingId] = useState(saved.editingId || null);
    const [form, setForm] = useState(saved.form || emptyForm);

    useEffect(() => {
        localStorage.setItem('travelPlanner', JSON.stringify({ plans, mode, editingId, form }));
    }, [plans, mode, editingId, form]);

    const startCreate = () => {
        setForm(emptyForm);
        setEditingId(null);
        setMode('create');
    };
    const startEdit = (plan) => {
        setForm(plan);
        setEditingId(plan.id);
        setMode('edit');
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setForm({ ...form, image: reader.result });
        reader.readAsDataURL(file);
    };
    const savePlan = () => {
        const { type, date, endDate, image, todo, time, place } = form;
        if (!date || !image || !todo || !time || !place || (type === 'multi' && !endDate)) {
            alert('All fields are required.');
            return;
        }

        if (editingId) {
            setPlans(plans.map((p) => (p.id === editingId ? { ...form, id: editingId } : p)));
        } else {
            setPlans([...plans, { ...form, id: Date.now() }]);
        }
        setMode('list');
    };

    const sortedPlans = [...plans].sort((a, b) => a.date.localeCompare(b.date));

    if (mode == 'create' || mode == 'edit') {
        return (
            <AppLayout>
                <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 rounded-xl p-4">
                    <div className="border-grey-300 flex w-100 flex-col gap-3 rounded-2xl border-3 p-10">
                        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="border-grey-300 border p-2">
                            <option value="single">Single day</option>
                            <option value="multi">Multi-day</option>
                        </select>

                        <label>{form.type === 'multi' ? 'Start date' : 'Date'}</label>
                        <input
                            className="border-grey-300 border p-2"
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />

                        {form.type === 'multi' && (
                            <div className="flex flex-col">
                                <label>End date</label>
                                <input
                                    className="border-grey-300 border p-2"
                                    type="date"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                />
                            </div>
                        )}

                        <label>Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} className="border-grey-300 border p-2" />
                        {form.image && <img src={form.image} alt="" className="w-32" />}

                        <label>To-do</label>
                        <input
                            className="border-grey-300 border p-2"
                            type="text"
                            value={form.todo}
                            onChange={(e) => setForm({ ...form, todo: e.target.value })}
                        />

                        <label>Time</label>
                        <input
                            className="border-grey-300 border p-2"
                            type="time"
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                        />

                        <label>Place</label>
                        <input
                            className="border-grey-300 border p-2"
                            type="text"
                            value={form.place}
                            onChange={(e) => setForm({ ...form, place: e.target.value })}
                        />

                        <div className="flex">
                            <button onClick={savePlan} className="flex-1 border border-gray-300 p-2">
                                Save
                            </button>
                            <button onClick={() => setMode('list')} className="border border-gray-300 p-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <button onClick={startCreate} className="border-gray-400 m-2 w-fit border p-2 text-2xl font-bold">
                    +
                </button>
                <div className="mt-4 flex flex-col flex-wrap gap-3">
                    {sortedPlans.map((plan) => (
                        <div key={plan.id} className="flex w-100 gap-3 rounded-xl border p-3">
                            <img src={plan.image} alt="" className="h-20 w-20 object-cover" />
                            <div className="flex-1">
                                <p className="font-semibold">
                                    {plan.date}
                                    {plan.type === 'multi' && ` - ${plan.endDate}`}
                                </p>
                                <p>{plan.todo}</p>
                                <p>
                                    {plan.time} @ {plan.place}
                                </p>
                            </div>
                            <button onClick={() => startEdit(plan)}>Edit</button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
