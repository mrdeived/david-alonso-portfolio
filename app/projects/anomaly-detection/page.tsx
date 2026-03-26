import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Predictive Anomaly Detection — David Alonso",
  description:
    "An early anomaly detection model for multivariate oil well sensor data, using an LSTM Autoencoder, time series windowing, and reconstruction error thresholding.",
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
        <p className="mb-14 text-lg leading-relaxed text-zinc-400">
          An early warning system for oil well operations, built to detect
          abnormal sensor patterns before they become operational failures. The
          focus was on making the detection logic interpretable and actionable —
          not just flagging anomalies, but helping analysts understand what drove
          them.
        </p>

        <div className="space-y-14">

          {/* Overview */}
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

          {/* Visual Overview */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-zinc-100">
              Visual Overview
            </h2>
            <figure className="overflow-hidden rounded-xl border border-zinc-800">
              <Image
                src="/projects/anomaly-detection/poster.png"
                alt="Project poster summarizing problem, methodology, and results"
                width={1200}
                height={800}
                className="w-full object-contain"
              />
              <figcaption className="border-t border-zinc-800 px-5 py-3 text-sm text-zinc-500">
                Project overview summarizing problem, methodology, and results
              </figcaption>
            </figure>
          </section>

          <hr className="border-zinc-800" />

          {/* Model Architecture */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-zinc-100">
              Model Architecture
            </h2>
            <figure className="overflow-hidden rounded-xl border border-zinc-800">
              <Image
                src="/projects/anomaly-detection/model-architecture.png"
                alt="LSTM Autoencoder architecture diagram"
                width={1200}
                height={700}
                className="w-full object-contain"
              />
              <figcaption className="border-t border-zinc-800 px-5 py-3 text-sm text-zinc-500">
                LSTM Autoencoder architecture used to reconstruct multivariate
                time-series sequences
              </figcaption>
            </figure>
          </section>

          <hr className="border-zinc-800" />

          {/* How It Works */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              How It Works
            </h2>
            <div className="space-y-6 leading-8 text-zinc-400">
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Time-Series Windowing
                </h3>
                <p>
                  Raw sensor readings are continuous — the model cannot consume
                  them directly. The pipeline segments the data into fixed-length
                  overlapping windows, each representing a short span of time
                  across all sensor channels. This lets the model learn what a
                  normal sequence of readings looks like, rather than treating
                  each timestamp in isolation.
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Encoder-Decoder Logic
                </h3>
                <p>
                  The model is an LSTM Autoencoder. The encoder compresses each
                  input window into a compact representation that captures the
                  essential pattern of that time span. The decoder then attempts
                  to reconstruct the original sequence from that compressed
                  representation. When trained exclusively on normal data, the
                  model learns to reconstruct healthy patterns accurately — and
                  struggles with anything that deviates from them.
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Reconstruction Error (MSE)
                </h3>
                <p>
                  After reconstruction, the mean squared error (MSE) between the
                  input window and its reconstruction is computed. Low error
                  means the model recognized the pattern as normal. High error
                  means it could not reproduce what it saw — a signal that
                  something unusual is happening across one or more sensor
                  channels.
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Anomaly Detection via Threshold
                </h3>
                <p>
                  A threshold is derived from the distribution of reconstruction
                  errors on validation data. Any window whose error exceeds this
                  threshold is flagged as an anomaly. Because the error is
                  computed per sensor channel, it is possible to identify not
                  just that something is wrong, but which signals are driving the
                  deviation — making the output actionable for operators, not
                  just a binary alert.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* What I Built */}
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
                into structured input sequences
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                LSTM Autoencoder trained on normal operational data to learn
                expected sensor behavior
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Reconstruction error scoring with threshold-based anomaly
                flagging per sensor channel
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Evaluation focused on early detection lead time, not just
                classification accuracy
              </li>
            </ul>
          </section>

          <hr className="border-zinc-800" />

          {/* Technologies Used */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "TensorFlow / Keras",
                "scikit-learn",
                "Pandas",
                "NumPy",
                "Jupyter",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
