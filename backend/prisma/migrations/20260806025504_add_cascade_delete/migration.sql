-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_routineId_fkey";

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
