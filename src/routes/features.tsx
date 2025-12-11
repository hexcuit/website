import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/layout'

export const Route = createFileRoute('/features')({
	component: Features,
})

function Features() {
	return (
		<>
			<section className='py-16 px-4'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl font-bold mb-4'>機能紹介</h1>
					<p className='text-lg text-muted-foreground'>HexcuitはLeague of Legendsプレイヤー向けのDiscord Botです</p>
				</div>
			</section>

			<Section title='ランク登録' className='bg-secondary/50'>
				<div className='max-w-3xl mx-auto space-y-4'>
					<p className='text-muted-foreground'>Riot IDを登録することで、LoLのランク情報を自動で取得・表示できます。</p>
					<div className='bg-background rounded-lg p-4 space-y-2'>
						<code className='text-primary'>/register [riot_id]</code>
						<p className='text-sm text-muted-foreground'>例: /register Player#JP1</p>
					</div>
					<ul className='list-disc list-inside text-muted-foreground space-y-1'>
						<li>ソロ/デュオ、フレックスのランクを表示</li>
						<li>チームメンバーのランクを一覧で確認可能</li>
						<li>自動更新でいつでも最新のランクを参照</li>
					</ul>
				</div>
			</Section>

			<Section title='チームバランシング'>
				<div className='max-w-3xl mx-auto space-y-4'>
					<p className='text-muted-foreground'>
						ボイスチャンネルのメンバーを、ランクを考慮してバランスの取れた2チームに分けます。
					</p>
					<div className='bg-secondary/50 rounded-lg p-4 space-y-3'>
						<div>
							<code className='text-primary'>/team balance</code>
							<p className='text-sm text-muted-foreground mt-1'>ランクを考慮したバランス分け</p>
						</div>
						<div>
							<code className='text-primary'>/team random</code>
							<p className='text-sm text-muted-foreground mt-1'>完全ランダムで分け</p>
						</div>
					</div>
					<ul className='list-disc list-inside text-muted-foreground space-y-1'>
						<li>VCに参加中のメンバーを自動検出</li>
						<li>除外オプションで特定メンバーを対象外に</li>
						<li>チーム合計レートの差を最小化</li>
					</ul>
				</div>
			</Section>

			<Section title='募集機能' className='bg-secondary/50'>
				<div className='max-w-3xl mx-auto space-y-4'>
					<p className='text-muted-foreground'>カスタムゲームの募集を作成し、参加者をボタンで管理できます。</p>
					<div className='bg-background rounded-lg p-4 space-y-3'>
						<div>
							<code className='text-primary'>/recruit create [description]</code>
							<p className='text-sm text-muted-foreground mt-1'>通常募集（参加者名を表示）</p>
						</div>
						<div>
							<code className='text-primary'>/recruit anonymous [description]</code>
							<p className='text-sm text-muted-foreground mt-1'>匿名募集（参加者数のみ表示）</p>
						</div>
						<div>
							<code className='text-primary'>/recruit rank [description]</code>
							<p className='text-sm text-muted-foreground mt-1'>ランク戦募集（勝敗報告でレート変動）</p>
						</div>
					</div>
					<ul className='list-disc list-inside text-muted-foreground space-y-1'>
						<li>定員10人で自動締切</li>
						<li>ボタンで参加/キャンセル</li>
						<li>募集作成者が終了を管理</li>
					</ul>
				</div>
			</Section>

			<Section title='サーバー内ランク'>
				<div className='max-w-3xl mx-auto space-y-4'>
					<p className='text-muted-foreground'>
						Discordサーバー独自のランクシステム。カスタムゲームの勝敗でレートが変動します。
					</p>
					<div className='bg-secondary/50 rounded-lg p-4 space-y-3'>
						<div>
							<code className='text-primary'>/rank server [@user]</code>
							<p className='text-sm text-muted-foreground mt-1'>統計カード画像を表示</p>
						</div>
						<div>
							<code className='text-primary'>/rank leaderboard [limit]</code>
							<p className='text-sm text-muted-foreground mt-1'>サーバー内ランキングを表示</p>
						</div>
					</div>
					<div className='bg-secondary/50 rounded-lg p-4'>
						<h4 className='font-semibold mb-2'>ランクティア</h4>
						<div className='flex flex-wrap gap-2 text-sm'>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#6B5344', color: 'white' }}>
								Iron
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#8B6914', color: 'white' }}>
								Bronze
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#7B8B8B', color: 'white' }}>
								Silver
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#FFD700', color: 'black' }}>
								Gold
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#00CED1', color: 'black' }}>
								Platinum
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#50C878', color: 'black' }}>
								Emerald
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#B9F2FF', color: 'black' }}>
								Diamond
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#9370DB', color: 'white' }}>
								Master
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#DC143C', color: 'white' }}>
								Grandmaster
							</span>
							<span className='px-2 py-1 rounded' style={{ backgroundColor: '#00BFFF', color: 'black' }}>
								Challenger
							</span>
						</div>
					</div>
					<ul className='list-disc list-inside text-muted-foreground space-y-1'>
						<li>初回5試合はプレイスメント期間</li>
						<li>Eloレーティングシステムで公平な変動</li>
						<li>統計カード画像で戦績を可視化</li>
						<li>直近5試合の履歴を表示</li>
					</ul>
				</div>
			</Section>
		</>
	)
}
