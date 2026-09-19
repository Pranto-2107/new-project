import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'Physics Zero to Hero' });
  });

  // AI Doubt Solver endpoint for SSC & HSC Physics
  app.post('/api/ask-doubt', async (req, res) => {
    const { question, studentClass = 'HSC', chapter = 'General Physics' } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Check if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are "Zero to Hero Physics Mentor", a friendly, brilliant, and patient physics teacher for Bangladeshi SSC and HSC students.
Target Audience: ${studentClass} Physics student.
Topic/Chapter: ${chapter}
Student Question: "${question}"

Provide an intuitive, encouraging, and crystal-clear response:
1. Core Intuition / Physical Meaning (simple real-life analogy without intimidating jargon).
2. The Key Formula(s) with clear SI units and variable definitions.
3. Step-by-step breakdown or numerical tip for Bangladesh Board Exam (CQ/MCQ) or Admission (BUET/Medical).
4. A quick "Common Trap to Avoid in Board Exam" tip.
5. Keep tone motivating, friendly, and structured. Use Markdown formatting.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        return res.json({
          answer: response.text,
          source: 'gemini',
        });
      } catch (err: any) {
        console.warn('Gemini API query error, falling back to curated expert response:', err?.message);
      }
    }

    // Fallback smart physics explanations if API key is not configured or fails
    const lower = question.toLowerCase();
    let answer = '';

    if (lower.includes('projectile') || lower.includes('প্রাস') || lower.includes('trajectory')) {
      answer = `### 🚀 Projectile Motion (প্রাস) — Simplified!

**1. Core Intuition:**
Think of kicking a football. Gravity only pulls downwards (Y-axis), while no force acts horizontally (X-axis, ignoring air resistance). Hence, horizontal velocity $v_x = v_0\\cos\\theta$ stays **constant**, while vertical velocity $v_y = v_0\\sin\\theta - gt$ changes!

**2. Key Formulas to Memorize:**
- **Time of Flight ($T$):** $T = \\frac{2v_0\\sin\\theta}{g}$
- **Maximum Height ($H$):** $H = \\frac{v_0^2\\sin^2\\theta}{2g}$
- **Horizontal Range ($R$):** $R = \\frac{v_0^2\\sin(2\\theta)}{g}$ (Max at $\\theta = 45^\\circ$)
- **Trajectory Equation (Parabola):** $y = x\\tan\\theta - \\frac{g x^2}{2v_0^2\\cos^2\\theta}$

**💡 Board Exam Pro-Tip:**
In CQ questions, if a ball clears a wall or goalkeeper, use the trajectory equation directly with $x = \\text{distance to wall}$ and solve for $y$!`;
    } else if (lower.includes('vector') || lower.includes('ভেক্টর') || lower.includes('resultant')) {
      answer = `### 🧭 Vector Addition & Resultant (সামান্তরিকের সূত্র)

**1. Core Intuition:**
If two forces $P$ and $Q$ pull an object at an angle $\\alpha$, the object moves along the diagonal of the parallelogram formed by them.

**2. Key Formulas:**
- **Resultant Magnitude ($R$):**
  $$R = \\sqrt{P^2 + Q^2 + 2PQ\\cos\\alpha}$$
- **Resultant Direction (Angle $\\theta$ with $P$):**
  $$\\tan\\theta = \\frac{Q\\sin\\alpha}{P + Q\\cos\\alpha}$$

**⚡ Quick Admission Traps:**
- When $\\alpha = 0^\\circ$: $R_{max} = P + Q$
- When $\\alpha = 180^\\circ$: $R_{min} = |P - Q|$
- When $\\alpha = 90^\\circ$: $R = \\sqrt{P^2 + Q^2}$
- If $P = Q$ and $\\alpha = 120^\\circ$, then $R = P$ (extremely frequent in Dhaka Board & BUET preliminary MCQ)!`;
    } else if (lower.includes('work') || lower.includes('energy') || lower.includes('কাজ') || lower.includes('শক্তি')) {
      answer = `### ⚙️ Work-Energy Theorem (কাজ-শক্তি উপপাদ্য)

**1. Physical Meaning:**
Net work done on an object by all forces equals the change in its kinetic energy:
$$W_{net} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2$$

**2. Constant Force vs Spring Force:**
- Constant Force: $W = \\vec{F} \\cdot \\vec{s} = F s \\cos\\theta$
  - If $\\theta < 90^\\circ$: Positive Work (Energy added)
  - If $\\theta = 90^\\circ$: Zero Work (e.g. Centripetal force, carrying load horizontally)
  - If $\\theta > 90^\\circ$: Negative Work (e.g. Friction)
- Spring Elastic Work: $W = \\frac{1}{2}k(x_i^2 - x_f^2)$ or $U = \\frac{1}{2}kx^2$

**💡 Common Trap:**
Centripetal force on a revolving planet does **ZERO** work because $\\vec{F} \\perp \\vec{v}$!`;
    } else {
      answer = `### 💡 Physics Concept Breakdown

**Understanding the Core Physics:**
In Physics, every formula is simply a quantitative sentence describing how nature behaves. When tackling "${question}":

1. **Identify the Given Quantities with Units:**
   Always convert all quantities to standard SI units (m, kg, s, N, J, V, A) before substituting.
2. **Choose the Governing Law:**
   Determine which conservation principle applies:
   - Conservation of Energy ($E_i = E_f$)
   - Conservation of Linear Momentum ($m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$)
   - Newton's Laws ($\\Sigma \\vec{F} = m\\vec{a}$)
3. **Board Exam CQ Presentation:**
   - Write formula first with proper indices.
   - Show unit substitution clearly.
   - Always conclude with proper significant figures and unit at the final step!

*Feel free to ask a specific numerical problem or chapter concept (e.g., Projectile, Vector, Thermodynamics, Current Electricity) to get a step-by-step solver!*`;
    }

    return res.json({
      answer,
      source: 'curated_offline',
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Physics Zero to Hero server running on http://localhost:${PORT}`);
  });
}

startServer();
