import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Hexcuit</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            League of Legendsのランク管理とチームバランシング機能を提供するDiscord Bot
          </p>
          <a
            href="#"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Botを招待する
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">機能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="ランク登録"
              description="Riot IDを登録してLoLランクを自動取得。チームメンバーのランクを一覧表示できます。"
            />
            <FeatureCard
              title="チームバランシング"
              description="登録されたランク情報を元に、公平なチーム分けを自動で行います。"
            />
            <FeatureCard
              title="募集機能"
              description="カスタムゲームの募集を作成し、参加者を管理できます。"
            />
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">コマンド</h2>
          <div className="space-y-4">
            <CommandItem command="/register" description="Riot IDを登録してランク情報を取得" />
            <CommandItem command="/rank" description="登録済みユーザーのランク一覧を表示" />
            <CommandItem command="/team" description="メンバーをバランスの取れた2チームに分割" />
            <CommandItem command="/recruit" description="カスタムゲームの募集を作成" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hexcuit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

function CommandItem({ command, description }: { command: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <code className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded font-mono text-sm whitespace-nowrap">
        {command}
      </code>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
