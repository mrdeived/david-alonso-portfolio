import Link from "next/link";

export const metadata = {
  title: "Predictive Anomaly Detection — David Alonso",
  description:
    "An early anomaly detection model for multivariate oil well sensor data, using time series preprocessing, windowing, and feature-level analysis.",
};

export default function AnomalyDetectionPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          ← Back to home
        </Link>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
          Machine Learning · Time Series · Anomaly Detection
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Predictive Anomaly Detection in Multivariate Oil Well Sensor Data
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-zinc-400">
          An early warning system for oil well operations, built to detect
          abnormal sensor patterns before they become operational failures. The
          focus was on making the detection logic interpretable and actionable —
          not just flagging anomalies, but helping analysts understand what drove
          them.
        </p>

        <div className="space-y-14">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Overview
            </h2>
            <p className="leading-8 text-zinc-400">
              Oil well sensors generate continuous streams of multivariate data
              — pressure, temperature, flow rates, and more. The challenge is
              that anomalies rarely show up in a single sensor in isolation. They
              appear as subtle shifts across multiple signals over time. This
              project built a pipeline that ingests raw sensor time series,
              processes it into analysis-ready windows, and applies detection
              logic to surface abnormal patterns early. The goal was early risk
              identification — catching something before it escalates, not after.
            </p>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              What I Built
            </h2>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                End-to-end preprocessing pipeline handling missing values, noise
                filtering, and normalization across sensor streams
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Sliding window segmentation to convert continuous time series
                into structured feature sets
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Feature-level analysis to identify which sensor signals
                contribute most to anomalous readings
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Anomaly scoring model trained to distinguish normal operational
                variance from early-stage risk signals
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Evaluation methodology focused on early detection lead time, not
                just classification accuracy
              </li>
            </ul>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technical Approach
            </h2>
            <p className="leading-8 text-zinc-400">
              The core challenge with multivariate time series anomaly detection
              is that you need to model relationships between variables, not just
              individual signals. The pipeline starts with data cleaning —
              handling gaps and outliers that are noise rather than signal — then
              applies a windowing strategy that captures enough temporal context
              for the model to learn what "normal" looks like over time.
              Feature-level analysis was used to make the output interpretable:
              instead of a black-box anomaly score, the results point to which
              sensors and time intervals drove the detection, supporting
              decision-making rather than just flagging an event. The
              preprocessing steps were carefully sequenced to avoid data leakage
              across training and evaluation windows.
            </p>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Python", "scikit-learn", "Pandas", "NumPy", "Jupyter"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
