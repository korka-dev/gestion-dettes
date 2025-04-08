import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Users, Plus, Check } from 'lucide-react';

interface Client {
  _id: string;
  name: string;
  phone: string;
  totalDebt: number;
  deposit: number;
  debts: Array<{
    _id: string;
    amount: number;
    productName: string; // Ajout du champ productName
    paid: boolean;
    date: string;
  }>;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des clients');
    }
  };

  const handlePayDebt = async (clientId: string, debtId: string) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/debts/${debtId}/pay`, {
        method: 'PUT'
      });

      if (response.ok) {
        toast.success('Dette marquée comme payée');
        fetchClients();
      }
    } catch (error) {
      toast.error('Erreur lors du paiement de la dette');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Liste des Clients</h2>
        </div>
        <Link
          to="/add-client"
          className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>Nouveau Client</span>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div key={client._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
              <p className="text-gray-600">{client.phone}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Dette totale: <span className="font-semibold text-gray-900">{client.totalDebt} FCFA</span>
                </p>
                <p className="text-sm text-gray-600">
                  Dépôt: <span className="font-semibold text-gray-900">{client.deposit} FCFA</span>
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Dettes</h4>
                <div className="mt-2 space-y-2">
                  {client.debts.map((debt) => (
                    <div key={debt._id} className="flex items-center justify-between text-sm">
                      <div>
                        <span>{new Date(debt.date).toLocaleDateString()}: </span>
                        <span className="font-medium">{debt.productName || 'Produit non spécifié'}</span>
                        <span> - {debt.amount} FCFA</span>
                      </div>
                      {!debt.paid && (
                        <button
                          onClick={() => handlePayDebt(client._id, debt._id)}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                          <span>Payer</span>
                        </button>
                      )}
                      {debt.paid && (
                        <span className="text-green-600">Payée</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/add-debt/${client._id}`}
                className="mt-6 flex items-center justify-center space-x-1 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter une dette</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;