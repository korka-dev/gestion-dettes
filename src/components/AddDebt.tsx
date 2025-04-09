import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CreditCard } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const AddDebt = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [productName, setProductName] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/clients/${clientId}/debts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: Number(amount), 
          productName: productName // Envoyez le nom du produit
        }),
      });

      if (response.ok) {
        toast.success('Dette ajoutée avec succès');
        navigate('/');
      } else {
        toast.error('Erreur lors de l\'ajout de la dette');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Ajouter une dette</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Produit</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nom du produit"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Montant</label>
          <input
            type="number"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ajouter la dette
        </button>
      </form>
    </div>
  );
};

export default AddDebt;