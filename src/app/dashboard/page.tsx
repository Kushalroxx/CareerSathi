import Header from '@/components/layout/Header'
import UserProgressDashboard from '@/components/dashboard/UserProgressDashboard'
import DailyQuestions from '@/components/dashboard/dailyQuestions'
import TodaysGoal from '@/components/dashboard/todaysGoal'
import QuickActions from '@/components/dashboard/quickActions'
import WelconeText from '@/components/dashboard/welconeText'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import DashboardRoadmapCard from '@/components/dashboard/dashboardRoadmapCard'
import Footer from '@/components/layout/Footer'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <div className='text-red-500 flex justify-center items-center h-screen'>Session expired. Please login.</div>
  }
  
  try {
    const roadmaps = await prisma.roadmap.findMany({
      where: { userId: session.user.id },
      include: { skillsToLearn: true, recommendedProjects: true }
    })

    return (
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Header />
        
        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto space-y-6">
            
            <WelconeText />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              <div className="lg:col-span-8 space-y-6">
                

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TodaysGoal />
                  <UserProgressDashboard />
                </div>

                <DashboardRoadmapCard roadmaps={roadmaps} />

              </div>

              <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
                <QuickActions />
                <div className="flex-1 min-h-[500px]"> 
                  <DailyQuestions />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  } catch (error) {
    console.error(error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-bold text-red-600">Unable to load dashboard</h2>
        <p className="text-slate-500">Please try refreshing the page.</p>
      </div>
    )
  }
}