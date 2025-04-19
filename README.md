# ADNAN NAOUS AI

موقع دردشة ذكي مبني بـ Next.js و OpenAI.
© 2025 ADNAN NAOUS AI

## خطوات التشغيل محليًا

1. نسخ المشروع:
   ```bash
   git clone https://github.com/AanTreuman/adnan-naous-ai.git
   cd adnan-naous-ai
   ```

2. تثبيت التبعيات:
   ```bash
   npm install
   ```

3. إنشاء ملف `.env.local` في جذر المشروع مع مفتاحك (لا تشارك المفتاح علنًا):
   ```bash
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
   ```

4. تشغيل الوضع التطويري:
   ```bash
   npm run dev
   ```

5. اذهب إلى [http://localhost:3000](http://localhost:3000)

## نشر على Render

1. سجل دخولك في [Render](https://render.com) وربط حساب GitHub.
2. اختر **New > Web Service**, ثم المستودع `adnan-naous-ai`.
3. إعدادات:
   - **Environment:** Node.js
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. أضف متغير بيئي `OPENAI_API_KEY` بقيمة مفتاحك الجديد.
5. اضغط **Create Web Service** وانتظر النشر.
6. افتح الرابط الذي يطلع لك لتنشر الموقع!
