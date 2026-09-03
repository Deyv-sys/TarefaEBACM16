import { useState } from 'react'
import ProdutoCard from './component/ProdutoCard'
import ouroImage from './assets/Ouro_Cadastro.jpg'
import fedoraImage from './assets/Fedora_Cadastro.jpg'
import camisaImage from './assets/Camisa_Cadastro.jpg'
import jaquetaImage from './assets/Jaqueta_Cadastro.jpg'
import calcaImage from './assets/Calça_Cadastro.jpg'
import tenisImage from './assets/Tenis_Cadastro.jpg'
import './App.css'

const initialProducts = [
	{ id: 1, name: 'Relogio Aurora', category: 'Acessórios', price: 300.90, description: 'Detalhes de ouro de 18 kilates.', image: ouroImage },
	{ id: 2, name: 'Fedora Elegante', category: 'Chapéus', price: 129.90, description: 'Estiloso para qualquer ocasião.', image: fedoraImage },
	{ id: 3, name: 'Camisa Essential', category: 'Vestuário', price: 159.90, description: 'Corte confortável e tecido de alta qualidade.', image: camisaImage },
	{ id: 4, name: 'Jaqueta Utility', category: 'Vestuário', price: 298.90, description: 'Estilo e personalidade em uma peça só.', image: jaquetaImage },
	{ id: 5, name: 'Calça Wide Leg', category: 'Vestuário', price: 219.90, description: 'Modelagem ampla para um visual Classico.', image: calcaImage },
	{ id: 6, name: 'Tênis Motion', category: 'Calçados', price: 279.90, description: 'Leveza para acompanhar seu ritmo.', image: tenisImage },
]

const emptyForm = { name: '', category: 'Vestuário', price: '', description: '' }

function App() {
	const [products, setProducts] = useState(initialProducts)
	const [form, setForm] = useState(emptyForm)
	const [search, setSearch] = useState('')

	const visibleProducts = products.filter((product) =>
		`${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()),
	)

	function handleSubmit(event) {
		event.preventDefault()
		if (!form.name.trim() || !form.price) return

		setProducts((current) => [{
			...form,
			id: Date.now(),
			name: form.name.trim(),
			description: form.description.trim() || 'Produto recém-adicionado ao catálogo.',
			price: Number(form.price),
			image: camisaImage,
		}, ...current])
		setForm(emptyForm)
	}

	function updateField(event) {
		setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
	}

	return (
		<div className="app-shell">
			<header className="topbar">
				<a className="brand" href="/" aria-label="Loja Estilo catálogo">
					<span><strong>LOJA ESTILO</strong><small>CATÁLOGO</small></span>
				</a>
				<span className="topbar__status"><i /> Catálogo online</span>
			</header>

			<main>
				<section className="intro">
					<div>
						<p className="eyebrow">Gestão de produtos</p>
						<h1>Seu catálogo,<br /><em>seu Estilo.</em></h1>
						<p className="intro__text">Organize suas peças e mantenha sua vitrine sempre pronta para receber novos achados.</p>
					</div>
					<div className="intro__count"><strong>{products.length.toString().padStart(2, '0')}</strong><span>itens<br />cadastrados</span></div>
				</section>

				<section className="workspace">
					<aside className="form-panel">
						<div className="panel-heading"><span className="step">01</span><div><p className="eyebrow">Novo item</p><h2>Cadastrar produto</h2></div></div>
						<form onSubmit={handleSubmit}>
							<label>Nome do produto<input name="name" value={form.name} onChange={updateField} placeholder="Ex.: Bolsa Luna" required /></label>
							<div className="form-row">
								<label>Categoria<select name="category" value={form.category} onChange={updateField}><option>Vestuário</option><option>Acessórios</option><option>Calçados</option><option>Chapéus</option></select></label>
								<label>Preço<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} placeholder="0,00" required /></label>
							</div>
							<label>Descrição <span>(opcional)</span><textarea name="description" value={form.description} onChange={updateField} placeholder="Conte um pouco sobre a peça..." rows="4" /></label>
							<button className="submit-button" type="submit">Adicionar ao catálogo <span>↗</span></button>
						</form>
					</aside>

					<section className="catalog-panel">
						<div className="catalog-heading"><div><p className="eyebrow">Sua vitrine</p><h2>Produtos cadastrados</h2></div><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produto" aria-label="Buscar produto" /></label></div>
						<div className="product-grid">{visibleProducts.map((product) => <ProdutoCard key={product.id} product={product} onRemove={(id) => setProducts((current) => current.filter((item) => item.id !== id))} />)}</div>
						{visibleProducts.length === 0 && <p className="empty-state">Nenhum produto encontrado.</p>}
					</section>
				</section>
			</main>
			<footer><span>Loja Estilo / 2026</span><span>Feito para destacar a sua Aparencia.</span></footer>
		</div>
	)
}

export default App
