'use client';
import React, { useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Score {
  id: number;
  score: number;
  units: number;
  grade: number;
  value: string;
}
const course = {
  id: new Date().getTime(),
  score: 0,
  units: 0,
  grade: 0,
  value: '',
};
const courses = [
  {
    id: 1,
    score: 0,
    units: 0,
    grade: 0,
    value: '',
  },
  {
    id: 2,
    score: 0,
    units: 0,
    grade: 0,
    value: '',
  },
  {
    id: 3,
    score: 0,
    units: 0,
    grade: 0,
    value: '',
  },
];

const Hero = () => {
  const [grades, setGrades] = useState(courses as Score[]);
  const [gp, setGp] = useState(0);
  const [cgpa, setCgpa] = useState(0);
  const [showGrade, setShowGrade] = useState(false);

  const cgpaRef = useRef<null | HTMLInputElement>(null);
  const totalUnitsRef = useRef<null | HTMLInputElement>(null);

  const addCourse = () => {
    setGrades((prev) => [...prev, { ...course, id: new Date().getTime() }]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let totalScore = 0;
    let totalUnit = 0;
    const formatted = grades.map((score): Score => {
      if (score.score < 40) {
        return { ...score, grade: 0, value: 'F' };
      } else if (score.score < 45) {
        return { ...score, grade: 1, value: 'E' };
      } else if (score.score < 50) {
        return { ...score, grade: 2, value: 'D' };
      } else if (score.score < 60) {
        return { ...score, grade: 3, value: 'C' };
      } else if (score.score < 70) {
        return { ...score, grade: 4, value: 'B' };
      } else if (score.score >= 70) {
        return { ...score, grade: 5, value: 'A' };
      }
      return { ...score, value: '' };
    });
    setGrades(formatted);
    const yourGp = formatted.reduce(
      (acc, score) => {
        totalScore += score?.grade! * score?.units!;
        totalUnit += score?.units!;
        acc.semesterScore = totalScore;
        acc.semesterUnits = totalUnit;
        acc.gp = totalScore / totalUnit;
        return acc;
      },
      { gp: 0, semesterUnits: 0, semesterScore: 0 }
    );

    setGp(yourGp.gp);
    const cgpa = +cgpaRef.current!.value;
    const totalUnits = +totalUnitsRef.current!.value;
    if (cgpa && totalUnits) {
      const aggregateScore = cgpa * totalUnits;
      const newCgpa =
        (aggregateScore + yourGp.semesterScore) /
        (yourGp.semesterUnits + totalUnits);
      setCgpa(newCgpa);
    } else {
      setCgpa(yourGp.gp);
    }
    setShowGrade(true);
  };
  return (
    <main className="relative w-[100vw] p-2 lg:w-[500px] mx-auto">
      <div className=" border border-gray-400 bg-white p-4 rounded-md ">
        <div className="border-b-2 border-gray-200">
          <h1 className="text-2xl text-center text-blue-700 font-semibold mb-4 tracking-wide uppercase">
            Grade scale: 5.00
          </h1>
        </div>
        <div className=" rounded-md p-2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6 gap-x-5">
              <div className="flex-1 flex flex-col gap-4 text-blue-600 rounded-md shadow-md p-2">
                <label htmlFor="cgpa">CURRENT CGPA</label>
                <input
                  type="number"
                  ref={cgpaRef}
                  className="w-full bg-inherit border-b-2 focus:outline-none text-blue-600 text-xl"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 text-blue-600 rounded-md shadow-md p-2">
                <label htmlFor="cgpa">TOTAL UNITS TAKEN</label>
                <input
                  type="number"
                  ref={totalUnitsRef}
                  className="w-full bg-inherit border-b-2 focus:outline-none text-blue-600 text-xl"
                />
              </div>
            </div>
            <div className="bg-blue-700 text-white px-1  py-2 text-xl rounded-md mb-8 ">
              <h3>Current semester scores</h3>
            </div>

            <div className="mb-8 flex gap-4">
              <p className="text-sm font-semibold">S/N</p>
              <p className="w-1/4 text-sm font-semibold mr-3">Total score</p>
              <p className="w-1/4 text-sm font-semibold">course units</p>
              {showGrade && <p className="text-sm font-semibold">Grade</p>}
            </div>
            <div className="flex flex-col mb-12">
              {grades.map((grade, index) => {
                return (
                  <div key={grade.id} className="flex gap-8 relative">
                    <p>{index + 1}</p>
                    <input
                      type="number"
                      onChange={(e) => (grade.score = +e.target.value)}
                      className="w-1/4 outline-none border-b border-blue-700 border-1 mb-2 p-2"
                      placeholder="Total score"
                    />
                    <input
                      type="number"
                      onChange={(e) => (grade.units = +e.target.value)}
                      className="w-1/4 outline-none border-b border-blue-700 border-1 mb-2 p-2"
                      placeholder="units"
                    />
                    {showGrade && <p className="mb-2">{grade.value}</p>}
                    <button
                      onClick={() =>
                        setGrades(grades.filter((prev) => prev.id !== grade.id))
                      }
                      className="absolute right-2 top-2"
                    >
                      <FaTrash fill="blue" size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mb-4">
              <button
                type="submit"
                className="bg-blue-600 px-2 py-1 rounded-md text-white shadow-md  hover:animate-pulse transition-all duration-300 ease-linear"
              >
                Calculate GPA
              </button>
              <button
                className="bg-white px-2 py-1 rounded-md text-blue-600 border-2 border-blue-700 hover:animate-pulse transition-all duration-300 ease-linear"
                type="button"
                onClick={addCourse}
              >
                Add Course
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-10 text-blue-700 text-xl font-semibold">
          <h3 className="text-2xl font-semibold">
            Your GPA is: {gp.toFixed(2)}
          </h3>
          <h3 className="text-2xl font-semibold">
            Your CGPA is: {cgpa.toFixed(2)}
          </h3>
        </div>
      </div>
    </main>
  );
};
export default Hero;
