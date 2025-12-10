import { createFileRoute } from '@tanstack/react-router'
import { Footer, Section } from '~/components/layout'

export const Route = createFileRoute('/terms')({
	component: Terms,
})

function Terms() {
	return (
		<div className='min-h-screen'>
			<Section title='利用規約'>
				<div className='max-w-3xl mx-auto prose prose-neutral dark:prose-invert'>
					<p className='text-muted-foreground text-center mb-8'>最終更新日: 2024年12月10日</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>1. はじめに</h2>
					<p className='text-muted-foreground mb-4'>
						この利用規約（以下「本規約」）は、Hexcuit Bot（以下「本Bot」）の利用条件を定めるものです。
						本Botを利用することにより、本規約に同意したものとみなされます。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>2. サービス内容</h2>
					<p className='text-muted-foreground mb-4'>本Botは以下の機能を提供します：</p>
					<ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
						<li>League of Legendsのランク情報の登録・表示</li>
						<li>チームバランシング機能</li>
						<li>カスタムゲームの募集管理</li>
					</ul>

					<h2 className='text-xl font-semibold mt-8 mb-4'>3. 禁止事項</h2>
					<p className='text-muted-foreground mb-4'>以下の行為を禁止します：</p>
					<ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
						<li>本Botの不正利用または悪用</li>
						<li>本Botのサービスを妨害する行為</li>
						<li>他のユーザーへの迷惑行為</li>
						<li>法令に違反する行為</li>
					</ul>

					<h2 className='text-xl font-semibold mt-8 mb-4'>4. 免責事項</h2>
					<p className='text-muted-foreground mb-4'>
						本Botは現状有姿で提供され、運営者は本Botの利用によって生じたいかなる損害についても責任を負いません。
						サービスの中断、変更、終了について事前の通知なく行う場合があります。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>5. 規約の変更</h2>
					<p className='text-muted-foreground mb-4'>
						運営者は、必要に応じて本規約を変更することがあります。
						変更後の規約は、本ページに掲載した時点で効力を生じるものとします。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>6. お問い合わせ</h2>
					<p className='text-muted-foreground mb-4'>本規約に関するお問い合わせは、以下の連絡先までお願いいたします。</p>
					<p className='text-muted-foreground'>
						運営者: 11gather11
						<br />
						メール:{' '}
						<a href='mailto:11gather1@gmail.com' className='text-primary hover:underline'>
							11gather1@gmail.com
						</a>
					</p>
				</div>
			</Section>
			<Footer />
		</div>
	)
}
