import { useState, useEffect } from 'react'

function CardList({cards, setCards, onCardClick}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        
        const fetchCardData = async () => {
            try {                
                setLoading(true);
                setError(null);

                // Fetch a list of the first 20 Pokémon
                const response = await fetch('https://pokeapi.co/api/v2/pokemon');
                if (!response.ok) throw new Error('failed to fetch character list')
                const data = await response.json();
                
                // 2. Map over the results to fetch the details (images) for each character
                const detailPromises = data.results.slice(0, 10).map(async (pokemon) => {
                    const res = await fetch(pokemon.url);

                    if (!res.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
                    const details = await res.json();

                    // 3. Return a clean, parsed object with only the properties you need
                    return {
                        id: details.id,
                        name: details.name,
                        image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
                    };
                });

                // Wait for all individual Pokémon detail fetches to resolve        
                const parsedCards = await Promise.all(detailPromises);

                // 4. Save the formatted data to your state
                setCards(parsedCards);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCardData();
    }, []);

    // Render loading, error, or your game board
    if (loading) return <div>Loading cards...</div>;
    if (error) return <div>Error: {error}</div>;



    return (
        <div className="pokemon-container">
            {cards.map((card) => (
                <div key={card.id} className="pokemon-card" onClick={()=> onCardClick(card.id)} >
                    <img src={card.image} alt={card.name} className="pokemon-image"/>
                    <p className="pokemon-name">{card.name}</p>
                </div>
            ))}
        </div>
    )

};
export default CardList;