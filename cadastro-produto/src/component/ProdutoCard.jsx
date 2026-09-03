function formatPrice(price) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',  
		currency: 'BRL'
	}).format(price)
}

export default function ProdutoCard({ product, onRemove }) {
	return (
		<article className="product-card">
			<div className="product-card__image-wrap">
				<img src={product.image} alt={product.name} className="product-card__image" />
				<span className="product-card__category">{product.category}</span>
			</div>
			<div className="product-card__body">
				<div>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
				</div>
				<div className="product-card__footer">
					<strong>{formatPrice(product.price)}</strong>
					<button type="button" className="icon-button" onClick={() => onRemove(product.id)} aria-label={`Remover ${product.name}`} title="Remover produto">
						&times;
					</button>
				</div>
			</div>
		</article>
        
	)
}
