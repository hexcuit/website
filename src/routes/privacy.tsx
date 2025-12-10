import { createFileRoute } from '@tanstack/react-router'
import { Footer, Section } from '~/components/layout'

export const Route = createFileRoute('/privacy')({
	component: Privacy,
})

function Privacy() {
	return (
		<div className='min-h-screen'>
			<Section title='プライバシーポリシー'>
				<div className='max-w-3xl mx-auto prose prose-neutral dark:prose-invert'>
					<p className='text-muted-foreground text-center mb-8'>最終更新日: 2024年12月10日</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>1. はじめに</h2>
					<p className='text-muted-foreground mb-4'>
						本プライバシーポリシーは、Hexcuit Bot（以下「本Bot」）が収集する情報とその取り扱いについて説明します。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>2. 収集する情報</h2>
					<p className='text-muted-foreground mb-4'>本Botは以下の情報を収集します：</p>
					<ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
						<li>Discord ID（ユーザー識別のため）</li>
						<li>登録されたRiot ID（ランク情報取得のため）</li>
						<li>League of Legendsのランク情報</li>
					</ul>

					<h2 className='text-xl font-semibold mt-8 mb-4'>3. 情報の利用目的</h2>
					<p className='text-muted-foreground mb-4'>収集した情報は以下の目的で利用します：</p>
					<ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
						<li>ランク情報の表示</li>
						<li>チームバランシング機能の提供</li>
						<li>募集機能の提供</li>
					</ul>

					<h2 className='text-xl font-semibold mt-8 mb-4'>4. 情報の保存と削除</h2>
					<p className='text-muted-foreground mb-4'>
						収集した情報は、サービス提供に必要な期間保存されます。
						ユーザーからの削除要求があった場合、合理的な期間内にデータを削除いたします。
					</p>
					<p className='text-muted-foreground mb-4'>
						データ削除をご希望の場合は、下記の連絡先までお問い合わせください。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>5. 第三者への提供</h2>
					<p className='text-muted-foreground mb-4'>
						収集した情報は、法令に基づく場合を除き、第三者に提供することはありません。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>6. セキュリティ</h2>
					<p className='text-muted-foreground mb-4'>
						収集した情報は、適切なセキュリティ対策を講じて保護します。
						ただし、インターネット上での完全なセキュリティを保証することはできません。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>7. ポリシーの変更</h2>
					<p className='text-muted-foreground mb-4'>
						本プライバシーポリシーは、必要に応じて変更されることがあります。
						変更後のポリシーは、本ページに掲載した時点で効力を生じるものとします。
					</p>

					<h2 className='text-xl font-semibold mt-8 mb-4'>8. お問い合わせ</h2>
					<p className='text-muted-foreground mb-4'>
						本ポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。
					</p>
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
