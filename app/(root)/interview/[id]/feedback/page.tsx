import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ScoreDisplay from "@/components/ScoreDisplay";
import CategoryScoreCard from "@/components/CategoryScoreCard";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  if (!feedback) {
    return (
      <section className="section-feedback">
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-lg text-light-100">No feedback available yet.</p>
          <Button className="btn-primary">
            <Link href={`/interview/${id}`}>Take Interview</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-feedback">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-semibold">
          Interview Feedback -{" "}
          <span className="capitalize">{interview.role}</span>
        </h1>
        <div className="flex flex-row gap-6 items-center max-sm:flex-col max-sm:gap-3">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/calendar.svg" width={20} height={20} alt="calendar" />
            <p className="text-light-100">
              {dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-light-100 capitalize">{interview.type}</span>
          </div>
        </div>
      </div>

      {/* Overall Score Hero Section */}
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold mb-2">Overall Score</h2>
          <p className="text-light-100">Your performance assessment</p>
        </div>
        <ScoreDisplay score={feedback.totalScore} />
      </div>

      <hr className="border-dark-300" />

      {/* Final Assessment */}
      <div className="blue-gradient-dark rounded-xl p-6 border border-primary-200/20">
        <h3 className="text-2xl font-semibold mb-4">Overall Assessment</h3>
        <p className="text-light-100 leading-relaxed">{feedback.finalAssessment}</p>
      </div>

      {/* Category Scores Grid */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold">Category Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedback.categoryScores?.map((category, index) => (
            <CategoryScoreCard
              key={index}
              name={category.name}
              score={category.score}
              comment={category.comment}
            />
          ))}
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="dark-gradient rounded-xl p-6 border border-dark-300/50">
          <div className="flex flex-row items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-success-100"></div>
            <h3 className="text-2xl font-semibold">Strengths</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {feedback.strengths?.map((strength, index) => (
              <li
                key={index}
                className="flex flex-row gap-3 items-start text-light-100"
              >
                <span className="text-success-100 mt-1">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="dark-gradient rounded-xl p-6 border border-dark-300/50">
          <div className="flex flex-row items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-destructive-100"></div>
            <h3 className="text-2xl font-semibold">Areas for Improvement</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {feedback.areasForImprovement?.map((area, index) => (
              <li
                key={index}
                className="flex flex-row gap-3 items-start text-light-100"
              >
                <span className="text-destructive-100 mt-1">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
