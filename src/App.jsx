import { useState } from 'react'
import './App.css'

function RecipeDetail({ recipe }) {
  const [activeTab, setActiveTab] = useState('ingredients')
  
  const categoryImage = recipe.category === 'breakfast' ? '/images/chutneys_image.png' :
    recipe.category === 'lunch' ? '/images/sweets_image.png' :
    recipe.category === 'dinner' ? '/images/sabzi_image.png' :
    '/images/snacks_image.png'

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail-image-section">
        <div className="recipe-image-wrapper">
          <img 
            src={categoryImage} 
            alt={recipe.title}
            className="recipe-main-image"
          />
        </div>
      </div>
      <div className="recipe-detail-content-section">
        <div className="recipe-detail-header">
          <h1>{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
        </div>
        
        <div className="recipe-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab-button ${activeTab === 'recipe' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipe')}
            >
              Recipe
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'ingredients' && (
              <div className="tab-panel ingredients-panel">
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'recipe' && (
              <div className="tab-panel recipe-panel">
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = [
  {
    id: 'breakfast',
    name: 'Chutneys',
    icon: '🥄',
    description: 'Delicious and flavorful chutneys to complement your meals',
    color: '#FF6B35'
  },
  {
    id: 'lunch',
    name: 'Sweets',
    icon: '🍬',
    description: 'Traditional South Indian sweets and desserts',
    color: '#F7931E'
  },
  {
    id: 'dinner',
    name: 'Sabzis',
    icon: '🥘',
    description: 'Tasty vegetable dishes and curries from South India',
    color: '#8B4513'
  },
  {
    id: 'snacks',
    name: 'Main Gravies',
    icon: '🍿',
    description: 'Crispy and delicious South Indian snacks',
    color: '#FFD700'
  }
]

const recipes = {
  breakfast: [
    {
      id: 1,
      title: 'Masala Dosa',
      description: 'Crispy fermented crepe filled with spiced potato filling',
      prepTime: '8 hours (fermentation)',
      cookTime: '20 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '2 cups rice',
        '1 cup urad dal (split black gram)',
        '1/2 tsp fenugreek seeds',
        'Salt to taste',
        'Water for soaking and grinding',
        'For Masala:',
        '4 large potatoes, boiled and cubed',
        '2 onions, sliced',
        '2 green chilies, chopped',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '1/2 tsp turmeric powder',
        'Curry leaves',
        '2 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Soak rice, urad dal, and fenugreek seeds separately for 6 hours',
        'Grind urad dal to smooth paste, rice to slightly coarse paste',
        'Mix both batters, add salt, and ferment overnight',
        'For masala: Heat oil, add mustard and cumin seeds',
        'Add curry leaves, green chilies, and onions',
        'Sauté until onions are translucent',
        'Add turmeric, boiled potatoes, and salt',
        'Mash slightly and mix well',
        'Heat a dosa tawa, pour batter in circular motion',
        'Cook until golden brown, add masala in center',
        'Fold and serve hot with coconut chutney and sambar'
      ]
    },
    {
      id: 2,
      title: 'Idli',
      description: 'Soft, fluffy steamed rice cakes - a South Indian staple',
      prepTime: '8 hours (fermentation)',
      cookTime: '15 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '2 cups idli rice',
        '1 cup urad dal',
        '1/2 tsp fenugreek seeds',
        'Salt to taste',
        'Water for soaking'
      ],
      instructions: [
        'Soak rice and urad dal separately for 6 hours',
        'Grind urad dal to smooth, fluffy paste',
        'Grind rice to slightly coarse paste',
        'Mix both batters, add salt',
        'Ferment overnight in warm place',
        'Grease idli plates, pour batter',
        'Steam for 10-12 minutes',
        'Serve hot with sambar and chutney'
      ]
    },
    {
      id: 3,
      title: 'Pongal',
      description: 'Creamy rice and lentil porridge, perfect for breakfast',
      prepTime: '10 min',
      cookTime: '25 min',
      servings: 4,
      category: 'breakfast',
      ingredients: [
        '1 cup rice',
        '1/2 cup moong dal (yellow lentils)',
        '4 cups water',
        '1 tsp black peppercorns',
        '1 tsp cumin seeds',
        '2 tbsp ghee',
        '10-12 cashews',
        'Curry leaves',
        'Ginger, grated',
        'Salt to taste'
      ],
      instructions: [
        'Dry roast moong dal until golden',
        'Wash rice and dal together',
        'Pressure cook with water for 3-4 whistles',
        'Heat ghee, add peppercorns and cumin',
        'Add cashews, curry leaves, and ginger',
        'Sauté until cashews are golden',
        'Add to cooked rice-dal mixture',
        'Mash slightly, add salt',
        'Cook for 2-3 minutes until creamy',
        'Serve hot with coconut chutney'
      ]
    }
  ],
  lunch: [
    {
      id: 4,
      title: 'Sambar',
      description: 'Tangy lentil stew with vegetables - the heart of South Indian meals',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: 6,
      category: 'lunch',
      ingredients: [
        '1 cup toor dal (pigeon peas)',
        '1 cup mixed vegetables (drumstick, okra, pumpkin)',
        '1 onion, chopped',
        '1 tomato, chopped',
        '2 tbsp sambar powder',
        '1/2 tsp turmeric',
        'Tamarind pulp (lemon-sized ball)',
        '1 tsp mustard seeds',
        '1/2 tsp fenugreek seeds',
        'Curry leaves',
        '2 red chilies',
        '2 tbsp oil',
        'Salt to taste',
        'Coriander leaves'
      ],
      instructions: [
        'Pressure cook toor dal until soft',
        'Soak tamarind in warm water, extract pulp',
        'Cook vegetables in tamarind water',
        'Add sambar powder and turmeric',
        'Mash dal and add to vegetables',
        'Simmer for 10 minutes',
        'Heat oil for tempering',
        'Add mustard seeds, fenugreek, red chilies, curry leaves',
        'Pour tempering over sambar',
        'Garnish with coriander leaves',
        'Serve hot with rice'
      ]
    },
    {
      id: 5,
      title: 'Rasam',
      description: 'Spicy, tangy soup made with tamarind and spices',
      prepTime: '10 min',
      cookTime: '20 min',
      servings: 4,
      category: 'lunch',
      ingredients: [
        '1/2 cup toor dal',
        'Tamarind pulp (small lemon-sized)',
        '2 tomatoes, chopped',
        '2 tsp rasam powder',
        '1/2 tsp turmeric',
        '1 tsp mustard seeds',
        '1/2 tsp cumin seeds',
        'Curry leaves',
        'Coriander leaves',
        '2 red chilies',
        '2 tbsp oil',
        'Salt to taste',
        'Asafoetida (hing)'
      ],
      instructions: [
        'Cook toor dal until soft, mash well',
        'Soak tamarind, extract pulp',
        'Boil tamarind water with tomatoes',
        'Add rasam powder, turmeric, salt',
        'Add mashed dal, simmer',
        'Heat oil, add mustard and cumin seeds',
        'Add red chilies, curry leaves, asafoetida',
        'Pour tempering over rasam',
        'Garnish with coriander',
        'Serve hot as soup or with rice'
      ]
    },
    {
      id: 6,
      title: 'Coconut Rice',
      description: 'Fragrant rice cooked with fresh coconut and spices',
      prepTime: '10 min',
      cookTime: '25 min',
      servings: 4,
      category: 'lunch',
      ingredients: [
        '2 cups cooked rice',
        '1 cup fresh grated coconut',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        '1 tsp chana dal',
        '2 red chilies',
        'Curry leaves',
        'Cashews',
        'Salt to taste',
        'Turmeric powder'
      ],
      instructions: [
        'Cook rice and let it cool',
        'Heat oil in a pan',
        'Add mustard seeds, urad dal, chana dal',
        'Add red chilies and curry leaves',
        'Add cashews and roast until golden',
        'Add grated coconut, sauté for 2 minutes',
        'Add turmeric and salt',
        'Mix in cooked rice gently',
        'Cook for 2-3 minutes',
        'Serve hot'
      ]
    }
  ],
  dinner: [
    {
      id: 7,
      title: 'Bisi Bele Bath',
      description: 'Spicy rice and lentil one-pot meal from Karnataka',
      prepTime: '20 min',
      cookTime: '30 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '1 cup rice',
        '1/2 cup toor dal',
        'Mixed vegetables (beans, carrot, peas)',
        '2 tbsp bisi bele bath powder',
        'Tamarind pulp',
        '1 onion, chopped',
        '1 tomato, chopped',
        '2 tbsp ghee',
        'Mustard seeds, curry leaves',
        'Cashews',
        'Salt to taste'
      ],
      instructions: [
        'Pressure cook rice and dal together',
        'Cook vegetables separately',
        'Heat ghee, add mustard seeds',
        'Add curry leaves, onions, tomatoes',
        'Add bisi bele bath powder',
        'Add tamarind pulp and water',
        'Mix in cooked rice-dal mixture',
        'Add vegetables, simmer',
        'Garnish with cashews and ghee',
        'Serve hot with papad'
      ]
    },
    {
      id: 8,
      title: 'Curd Rice',
      description: 'Cooling yogurt rice - perfect end to a South Indian meal',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'dinner',
      ingredients: [
        '2 cups cooked rice',
        '1 cup thick curd (yogurt)',
        '1 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp urad dal',
        'Green chilies, chopped',
        'Ginger, grated',
        'Curry leaves',
        'Salt to taste',
        'Milk (optional)'
      ],
      instructions: [
        'Mash cooked rice slightly when warm',
        'Add curd and mix well',
        'Add salt and mix',
        'Heat oil for tempering',
        'Add mustard seeds and urad dal',
        'Add green chilies, ginger, curry leaves',
        'Pour tempering over curd rice',
        'Mix gently, add milk if needed',
        'Serve at room temperature',
        'Garnish with coriander or pomegranate'
      ]
    }
  ],
  snacks: [
    {
      id: 9,
      title: 'Medu Vada',
      description: 'Crispy, fluffy lentil fritters - perfect tea-time snack',
      prepTime: '4 hours (soaking)',
      cookTime: '20 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '2 cups urad dal',
        '2 green chilies, chopped',
        '1 inch ginger, grated',
        'Peppercorns',
        'Curry leaves, chopped',
        'Salt to taste',
        'Oil for deep frying'
      ],
      instructions: [
        'Soak urad dal for 4 hours',
        'Grind to smooth, fluffy paste',
        'Add salt and mix well',
        'Add green chilies, ginger, peppercorns, curry leaves',
        'Heat oil for deep frying',
        'Wet hands, shape vadas with hole in center',
        'Fry until golden brown and crispy',
        'Drain on paper towel',
        'Serve hot with coconut chutney and sambar'
      ]
    },
    {
      id: 10,
      title: 'Bonda',
      description: 'Crispy potato-filled fritters from South India',
      prepTime: '20 min',
      cookTime: '20 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        'For filling:',
        '4 potatoes, boiled and mashed',
        '1 onion, chopped',
        '2 green chilies',
        'Ginger, grated',
        'Curry leaves',
        'Turmeric, salt',
        'For batter:',
        '1 cup besan (gram flour)',
        'Rice flour',
        'Red chili powder',
        'Salt',
        'Water',
        'Oil for frying'
      ],
      instructions: [
        'Heat oil, add onions, green chilies, ginger',
        'Add curry leaves, turmeric',
        'Add mashed potatoes, salt, mix well',
        'Make small balls of potato mixture',
        'Make batter with besan, rice flour, spices',
        'Dip potato balls in batter',
        'Deep fry until golden and crispy',
        'Serve hot with chutney'
      ]
    },
    {
      id: 11,
      title: 'Rava Upma',
      description: 'Semolina-based savory breakfast or snack',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'snacks',
      ingredients: [
        '1 cup rava (semolina)',
        '2 cups water',
        '1 onion, chopped',
        '2 green chilies',
        'Ginger, grated',
        'Curry leaves',
        'Mustard seeds, urad dal',
        'Cashews',
        '2 tbsp oil',
        'Salt to taste',
        'Lemon juice'
      ],
      instructions: [
        'Dry roast rava until fragrant',
        'Heat oil, add mustard seeds, urad dal',
        'Add cashews, curry leaves',
        'Add onions, green chilies, ginger',
        'Sauté until onions are translucent',
        'Add water, salt, bring to boil',
        'Add roasted rava, stir continuously',
        'Cook until water is absorbed',
        'Add lemon juice, mix well',
        'Serve hot'
      ]
    }
  ],
  desserts: [
    {
      id: 12,
      title: 'Payasam',
      description: 'Creamy rice pudding with jaggery and cardamom',
      prepTime: '10 min',
      cookTime: '30 min',
      servings: 6,
      category: 'desserts',
      ingredients: [
        '1/2 cup rice',
        '1/2 cup jaggery, grated',
        '4 cups milk',
        '1/2 cup coconut milk',
        'Cardamom powder',
        'Cashews and raisins',
        '2 tbsp ghee',
        'Saffron strands (optional)'
      ],
      instructions: [
        'Wash and soak rice for 30 minutes',
        'Cook rice in milk until soft',
        'Add jaggery, stir until dissolved',
        'Add coconut milk, cardamom',
        'Heat ghee, fry cashews and raisins',
        'Add to payasam',
        'Garnish with saffron',
        'Serve warm or chilled'
      ]
    },
    {
      id: 13,
      title: 'Rava Kesari',
      description: 'Sweet semolina pudding - a festival favorite',
      prepTime: '5 min',
      cookTime: '15 min',
      servings: 4,
      category: 'desserts',
      ingredients: [
        '1 cup rava (semolina)',
        '1 cup sugar',
        '3 cups water',
        '4 tbsp ghee',
        'Cardamom powder',
        'Cashews and raisins',
        'Saffron strands',
        'Food color (orange/yellow)'
      ],
      instructions: [
        'Heat ghee, roast rava until golden',
        'Boil water separately',
        'Add hot water to rava, stir continuously',
        'Cook until rava is soft',
        'Add sugar, mix well',
        'Add cardamom, saffron, food color',
        'Fry cashews and raisins in ghee',
        'Add to kesari, mix',
        'Serve hot'
      ]
    }
  ],
  beverages: [
    {
      id: 14,
      title: 'Filter Coffee',
      description: 'Traditional South Indian filter coffee - strong and aromatic',
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 2,
      category: 'beverages',
      ingredients: [
        '2 tbsp coffee powder (South Indian blend)',
        '2 cups water',
        '2 cups milk',
        'Sugar to taste',
        'Coffee filter set'
      ],
      instructions: [
        'Boil water',
        'Add coffee powder to filter',
        'Pour hot water over coffee',
        'Let it drip for 10-15 minutes',
        'Boil milk separately',
        'Mix decoction with hot milk',
        'Add sugar to taste',
        'Pour between two containers to froth',
        'Serve hot in traditional tumbler'
      ]
    },
    {
      id: 15,
      title: 'Buttermilk (Moru)',
      description: 'Cooling spiced buttermilk - perfect for hot days',
      prepTime: '5 min',
      cookTime: '0 min',
      servings: 4,
      category: 'beverages',
      ingredients: [
        '2 cups buttermilk',
        '1 cup water',
        'Salt to taste',
        'Ginger, grated',
        'Green chilies, chopped',
        'Curry leaves',
        'Coriander leaves',
        'Asafoetida'
      ],
      instructions: [
        'Whisk buttermilk with water',
        'Add salt, mix well',
        'Add grated ginger',
        'Add chopped green chilies',
        'Add curry leaves and coriander',
        'Add pinch of asafoetida',
        'Mix well, chill',
        'Serve cold'
      ]
    }
  ]
}

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'categories', 'category', 'recipe'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentView('category')
  }

  const handleGetCooking = () => {
    setCurrentView('categories')
  }

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
    setCurrentView('recipe')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedCategory(null)
    setSelectedRecipe(null)
  }

  const handleBackToCategory = () => {
    setCurrentView('category')
    setSelectedRecipe(null)
  }

  const currentRecipes = selectedCategory ? recipes[selectedCategory] || [] : []

  return (
    <div className="app">
      {currentView === 'home' && (
        <div className="homepage-split">
          <div className="home-left">
            <div className="home-content">
              <h1 className="main-title">
                <span>Savor Every Bite</span>
                <span>with Sasi's</span>
                <span>Recipes</span>
              </h1>
              <p className="home-description">
                These recipes are easy to follow, beginner friendly, and made with simple ingredients you already know. Whether you are learning to cook or just want reliable home food, you will find dishes that actually work and taste like home.
              </p>
              <button className="get-cooking-button" onClick={handleGetCooking}>
                <span>Get Cooking</span>
              </button>
            </div>
          </div>
          <div className="divider-line"></div>
          <div className="home-right">
            <div className="food-photography">
              <div className="food-item main-frame">
                <img 
                  src="/images/main_frame.png" 
                  alt="Main frame" 
                  className="food-image main-frame-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {(currentView === 'categories' || currentView === 'category' || currentView === 'recipe') && (
        <header className="header">
          {currentView === 'categories' && (
            <button className="header-back-button" onClick={handleBackToHome} title="Back to Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {currentView === 'category' && (
            <button className="header-back-button" onClick={() => setCurrentView('categories')} title="Back to Categories">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {currentView === 'recipe' && selectedRecipe && (
            <button className="header-back-button" onClick={handleBackToCategory} title={`Back to ${categories.find(c => c.id === selectedRecipe.category)?.name}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          <h1>
            Sasi's South Indian Recipe Book
          </h1>
          <p>Authentic recipes from the heart of South India</p>
        </header>
      )}

      <main className={`main-content ${currentView === 'categories' || currentView === 'category' ? 'full-width' : ''}`}>
        {currentView === 'categories' && (
          <div className="categories-view">
            <div className="category-magazine-layout">
              {categories.map((category, index) => {
                const categoryImage = category.id === 'breakfast' ? '/images/chutneys_category_image.png' :
                  category.id === 'lunch' ? '/images/sweets_category_image.png' :
                  category.id === 'dinner' ? '/images/sabzi_image.png' :
                  '/images/main_gravies_category_image.png'
                
                return (
                  <div
                    key={category.id}
                    className={`magazine-category-section category-${index + 1}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="magazine-image-container">
                      <img
                        src={categoryImage}
                        alt={category.name}
                        className="magazine-category-image"
                      />
                    </div>
                    <div className="magazine-text-block">
                      <h2 className="magazine-category-title">{category.name}</h2>
                      <p className="magazine-category-description">{category.description}</p>
                    </div>
                    <div className="magazine-vertical-label">{category.name}</div>
                  </div>
                )
              })}
              <div className="magazine-info-strip" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
                <div className="info-strip-content">
                  <p className="info-strip-quote">Where simplicity becomes flavour.</p>
                  <h3 className="info-strip-title">South Indian Cuisine</h3>
                  <p className="info-strip-text">
                    A rich tapestry of flavors, South Indian food celebrates the harmony of spices, 
                    grains, and fresh ingredients. From the tangy chutneys that awaken the palate 
                    to the sweet treats that mark celebrations, each dish tells a story of tradition 
                    and home.
                  </p>
                  <p className="info-strip-text">
                    Rooted in centuries of culinary wisdom, these recipes have been passed down 
                    through generations, preserving the authentic taste of South India in every bite.
                  </p>
                </div>
              </div>
              <div className="magazine-info-strip-right" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
                <div className="info-strip-content">
                  <p className="info-strip-text">
                    Sweets hold a special place in South Indian culture, crafted with love using time-honored recipes.
                  </p>
                  <p className="info-strip-text">
                    From festive laddus to quiet evening treats, sweets mark moments both big and small. They are offerings, celebrations, and memories passed gently from one generation to the next.
                  </p>
                  <p className="info-strip-quote">A balanced diet is a sweet in each hand.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'category' && (
          <div className="category-view">
            <div className="chutney-magazine-layout">
              <div className="chutney-hero-section">
                <div className="chutney-hero-image">
                  <img 
                    src={selectedCategory === 'breakfast' ? '/images/chutneys_image.png' :
                         selectedCategory === 'lunch' ? '/images/sweets_image.png' :
                         selectedCategory === 'dinner' ? '/images/sabzi_image.png' :
                         '/images/snacks_image.png'}
                    alt={categories.find(c => c.id === selectedCategory)?.name}
                    className="chutney-hero-img"
                  />
                  <div className="chutney-red-overlay"></div>
                </div>
                <div className="chutney-hero-content">
                  <h1 className="chutney-hero-title">
                    {selectedCategory === 'breakfast' ? (
                      <>
                        TRADITION
                        <br />
                        MEETS
                        <br />
                        FLAVOR
                      </>
                    ) : selectedCategory === 'lunch' ? (
                      <>
                        SWEET
                        <br />
                        CELEBRATIONS
                        <br />
                        OF HOME
                      </>
                    ) : selectedCategory === 'dinner' ? (
                      <>
                        VEGETABLE
                        <br />
                        HARMONY
                        <br />
                        IN SPICES
                      </>
                    ) : (
                      <>
                        CRISPY
                        <br />
                        DELIGHTS
                        <br />
                        FOR ALL
                      </>
                    )}
                  </h1>
                  <div className="chutney-hero-text">
                    <p>
                      {selectedCategory === 'breakfast' && (
                        <>
                          Chutneys are an integral part of South Indian cuisine, adding vibrant flavors and textures to every meal. These versatile condiments are made from fresh ingredients, spices, and herbs, creating a perfect balance of sweet, sour, spicy, and tangy flavors. Traditional South Indian chutneys are typically made fresh daily using ingredients like coconut, coriander, mint, tamarind, and various lentils.
                        </>
                      )}
                      {selectedCategory === 'lunch' && (
                        <>
                          Sweets hold a special place in South Indian culture, often prepared during festivals, celebrations, and auspicious occasions. These traditional desserts are crafted with love, using time-honored recipes passed down through generations, featuring ingredients like jaggery, coconut, rice, and lentils.
                        </>
                      )}
                      {selectedCategory === 'dinner' && (
                        <>
                          Sabzis, or vegetable curries, form the heart of South Indian vegetarian cuisine. These flavorful dishes showcase the region's abundant produce, cooked with aromatic spices and traditional techniques that bring out the natural flavors of vegetables while creating rich, satisfying gravies.
                        </>
                      )}
                      {selectedCategory === 'snacks' && (
                        <>
                          South Indian snacks are beloved for their crispy textures, bold flavors, and perfect balance of spices. These delightful treats are enjoyed throughout the day - as tea-time accompaniments, evening snacks, or festive specials. From deep-fried delicacies to steamed favorites, they showcase the region's culinary creativity.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="chutney-split-layout">
                <div className="chutney-sidebar">
                  <h2 className="chutney-sidebar-main-title">South Indian Recipes</h2>
                  <div className="chutney-sidebar-content">
                  {selectedCategory === 'breakfast' && (
                    <>
                      <p className="chutney-intro">
                        Chutneys are an integral part of South Indian cuisine, adding vibrant flavors and textures to every meal. These versatile condiments are made from fresh ingredients, spices, and herbs, creating a perfect balance of sweet, sour, spicy, and tangy flavors.
                      </p>
                      <div className="chutney-benefits">
                        <h3 className="chutney-benefits-title">Benefits</h3>
                        <ul className="chutney-benefits-list">
                          <li>Rich in antioxidants from fresh herbs and spices</li>
                          <li>Aids in digestion with natural enzymes</li>
                          <li>Enhances the nutritional value of meals</li>
                          <li>Adds flavor without excessive calories</li>
                          <li>Contains probiotics from fermentation</li>
                          <li>Boosts metabolism with spices like ginger and chilies</li>
                        </ul>
                      </div>
                      <div className="chutney-info">
                        <h3 className="chutney-info-title">About Chutneys</h3>
                        <p className="chutney-info-text">
                          Traditional South Indian chutneys are typically made fresh daily using ingredients like coconut, coriander, mint, tamarind, and various lentils. They can be served as accompaniments with dosas, idlis, vadas, and rice dishes. Each region has its own unique variations, making chutneys a diverse and essential component of South Indian culinary heritage.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCategory === 'lunch' && (
                    <>
                      <p className="chutney-intro">
                        Sweets hold a special place in South Indian culture, often prepared during festivals, celebrations, and auspicious occasions. These traditional desserts are crafted with love, using time-honored recipes passed down through generations, featuring ingredients like jaggery, coconut, rice, and lentils.
                      </p>
                      <div className="chutney-benefits">
                        <h3 className="chutney-benefits-title">Benefits</h3>
                        <ul className="chutney-benefits-list">
                          <li>Provides instant energy from natural sugars</li>
                          <li>Rich in essential nutrients from traditional ingredients</li>
                          <li>Often made with jaggery, a healthier alternative to refined sugar</li>
                          <li>Contains healthy fats from coconut and ghee</li>
                          <li>Brings joy and satisfaction, enhancing overall well-being</li>
                          <li>Cultural significance in celebrations and rituals</li>
                        </ul>
                      </div>
                      <div className="chutney-info">
                        <h3 className="chutney-info-title">About Sweets</h3>
                        <p className="chutney-info-text">
                          South Indian sweets are known for their unique textures and flavors, ranging from creamy payasams to crumbly laddus. Popular varieties include Mysore Pak, Badam Halwa, Rava Kesari, and various types of payasam. These sweets are often offered as prasadam in temples and shared during festivals like Diwali, Pongal, and weddings.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCategory === 'dinner' && (
                    <>
                      <p className="chutney-intro">
                        Sabzis, or vegetable curries, form the heart of South Indian vegetarian cuisine. These flavorful dishes showcase the region's abundant produce, cooked with aromatic spices and traditional techniques that bring out the natural flavors of vegetables while creating rich, satisfying gravies.
                      </p>
                      <div className="chutney-benefits">
                        <h3 className="chutney-benefits-title">Benefits</h3>
                        <ul className="chutney-benefits-list">
                          <li>High in fiber, vitamins, and minerals</li>
                          <li>Low in calories, supporting healthy weight management</li>
                          <li>Rich in antioxidants from vegetables and spices</li>
                          <li>Promotes digestive health with natural fiber</li>
                          <li>Provides essential nutrients for overall wellness</li>
                          <li>Supports heart health with plant-based nutrition</li>
                        </ul>
                      </div>
                      <div className="chutney-info">
                        <h3 className="chutney-info-title">About Sabzis</h3>
                        <p className="chutney-info-text">
                          South Indian sabzis are characterized by their use of mustard seeds, curry leaves, and coconut, creating distinct regional flavors. From dry stir-fries like poriyal to rich gravies like avial, these dishes are typically served with rice, roti, or as part of a thali. Each state has its signature preparations, reflecting local tastes and available ingredients.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCategory === 'snacks' && (
                    <>
                      <p className="chutney-intro">
                        South Indian snacks are beloved for their crispy textures, bold flavors, and perfect balance of spices. These delightful treats are enjoyed throughout the day - as tea-time accompaniments, evening snacks, or festive specials. From deep-fried delicacies to steamed favorites, they showcase the region's culinary creativity.
                      </p>
                      <div className="chutney-benefits">
                        <h3 className="chutney-benefits-title">Benefits</h3>
                        <ul className="chutney-benefits-list">
                          <li>Provides quick energy for active lifestyles</li>
                          <li>Rich in protein from lentils and legumes</li>
                          <li>Contains healthy fats when prepared with quality oils</li>
                          <li>Satisfies cravings in a flavorful way</li>
                          <li>Often includes beneficial spices like turmeric and cumin</li>
                          <li>Brings people together during social gatherings</li>
                        </ul>
                      </div>
                      <div className="chutney-info">
                        <h3 className="chutney-info-title">About Snacks</h3>
                        <p className="chutney-info-text">
                          South Indian snacks range from crispy vadas and bondas to savory murukkus and mixture. These snacks are often made with rice flour, urad dal, and spices, creating unique textures and flavors. They're perfect for evening tea, served during festivals, or enjoyed as street food. Popular varieties include Medu Vada, Masala Vada, Murukku, and various types of namkeen.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="chutney-cards-container">
                <div className="chutney-layout">
                  {currentRecipes.map(recipe => {
                    let totalTime = recipe.cookTime
                    if (recipe.prepTime.includes('hours')) {
                      const hours = recipe.prepTime.match(/(\d+)\s*hours?/)?.[1] || '8'
                      totalTime = `${hours} hrs`
                    } else {
                      const cookTimeNum = parseInt(recipe.cookTime) || 0
                      if (cookTimeNum >= 60) {
                        totalTime = `${Math.floor(cookTimeNum / 60)} hr`
                      } else {
                        totalTime = `${cookTimeNum} mins`
                      }
                    }
                    const difficulty = recipe.prepTime.includes('hours') ? 'Hard' : 
                      (parseInt(recipe.cookTime) || 0) < 20 ? 'Easy' : 'Medium'
                    const categoryImage = selectedCategory === 'breakfast' ? '/images/chutneys_image.png' :
                      selectedCategory === 'lunch' ? '/images/sweets_image.png' :
                      selectedCategory === 'dinner' ? '/images/sabzi_image.png' :
                      '/images/snacks_image.png'
                    return (
                      <div
                        key={recipe.id}
                        className="chutney-card"
                        onClick={() => handleRecipeClick(recipe)}
                      >
                        <div className="chutney-card-image-wrapper">
                          <img
                            src={categoryImage}
                            alt={recipe.title}
                            className="chutney-card-image"
                          />
                        </div>
                        <div className="chutney-card-content">
                          <h3 className="chutney-card-title">{recipe.title.toUpperCase()}</h3>
                          <p className="chutney-card-description">{recipe.description}</p>
                          <div className="difficulty-badge">
                            {difficulty}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'recipe' && selectedRecipe && (
          <RecipeDetail recipe={selectedRecipe} />
        )}
      </main>

    </div>
  )
}

export default App
