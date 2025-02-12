import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/results.module.css";

const Results = () => {
  const router = useRouter();
  const { percentages } = router.query;
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!percentages || !chartRef.current) return;

    const parsedPercentages = percentages.split(",").map(parseFloat);
    const softSkillPercentages = Object.fromEntries(
      parsedPercentages.map((percentage, index) => [
        softSkills[index],
        percentage,
      ])
    );

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    createRadarChart(softSkillPercentages);
  }, [percentages]);

  const softSkills = [
    "Autonomie",
    "Esprit d'équipe",
    "Ponctualité",
    "Leadership",
    "Curiosité",
    "Gestion des conflits",
    "Créativité",
    "Adaptabilité",
  ];

  const createRadarChart = (softSkillPercentages) => {
    const labels = softSkills;
    const data = labels.map((label) => softSkillPercentages[label] || 0);

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Pourcentage",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            grid: {
              color: "white",
            },
            angleLines: {
              color: "white",
            },
            pointLabels: {
              color: "white",
            },
          },
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.radarchat_container}>
        <canvas
          ref={chartRef}
          id="radarChart"
          width="100"
          height="100"
        ></canvas>
      </div>
      <Link href="/">
        <button className={styles.Backbutton}>Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default Results;
