import { Course } from '../courseTypes';

export const hoyerLiftTrainingCourse: Course = {
  id: "hoyer-lift-training",
  title: "Hoyer Lift Operation and Safety",
  description: "Learn the proper techniques for safely operating a Hoyer lift to transfer individuals, covering transfers from bed to chair and chair to bed.",
  category: "Patient Care Techniques",
  instructor: "Clinical Education Department",
  thumbnail: "/Images/hoyerllift.png", // Reminder: Add this image to your public/Images folder
  duration: "Approx. 30 minutes",
  certificateAvailable: true,
  modules: [
    {
      id: "mod-1-bed-to-chair",
      title: "Hoyer Lift: Transferring from Bed to Chair",
      description: "This module demonstrates the step-by-step procedure for safely transferring an individual from a bed to a wheelchair or chair using a Hoyer lift.",
      content: "### Key Steps for Bed to Chair Transfer:\n1. Prepare the environment and equipment.\n2. Position the sling correctly under the individual.\n3. Attach the sling to the Hoyer lift.\n4. Perform the lift and transfer smoothly.\n5. Ensure the individual is safely and comfortably seated.",
      videoUrl: "https://www.youtube.com/embed/MI1CMip07tA?start=347", // Using YouTube embed format
    },
  ],
};
