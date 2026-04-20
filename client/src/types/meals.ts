export interface Meal {
    id: string;
    user_id: string;
    name: string;
    ingredients: Ingredient[];
    servings: number;
    instructions: string;
    prep_time_minutes: number;
    category: string;
    created_at?: string;
    updated_at?: string;
}

export interface Ingredient {
    name: string;
    amount?: number;
    unit?: string;
}