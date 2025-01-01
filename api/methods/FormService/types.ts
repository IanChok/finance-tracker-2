export enum Bank {
    TD,
    BMO
}

export type Transaction = {
    id: string,
    date: Date,
    description: string,
    category: SpendingCategory,
    amount: number,
    total_balance: number
}

export type ScopedTransactions = {
    bank: Bank,
    account: string
    transactions: Transaction[]
}

export enum SpendingGenre {
    Essentials = "Essentials",
    Lifestyle = "Lifestyle",
    Financial = "Financial",
    HealthWellness = "Health & Wellness",
    Miscellaneous = "Miscellaneous",
    Other = "Other"

}

export enum SpendingCategory {
    // Essentials
    Housing = "Housing",
    Utilities = "Utilities",
    Groceries = "Groceries",
    Transportation = "Transportation",
  
    // Lifestyle
    DiningOut = "Dining Out",
    Entertainment = "Entertainment",
    Fitness = "Fitness",
    Hobbies = "Hobbies",
  
    // Financial
    Savings = "Savings",
    Insurance = "Insurance",

    // Health & Wellness
    HealthInsurance = "Health Insurance",
    Medical = "Medical",
    PersonalCare = "Personal Care",
  
    // Miscellaneous
    Clothing = "Clothing",
    Education = "Education",
    GiftsDonations = "Gifts/Donations",
    Travel = "Travel",
    Household = "Household",
    PetCare = "Pet Care",
  
    // Other
    EmergencyExpenses = "Emergency Expenses",
    Miscellaneous = "Miscellaneous",
  }