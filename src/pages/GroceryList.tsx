import axios from 'axios';

const API_BASE_URL = 'http://localhost:27017/api';
const GROCERIES_URL = `${API_BASE_URL}/groceries`;

import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/react';
import { Toast } from '@capacitor/toast'; // Uncomment this import

const GroceryList: React.FC = () => {
  const [groceries, setGroceries] = useState<{ name: string; quantity: string; }[]>([]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemQuantity, setEditItemQuantity] = useState('');

  const showToast = (message: string) => {
    Toast.show({ text: message });
  };

  const handleAdd = () => {
    if (newItemName.trim() !== '') {
      setGroceries((prevGroceries) => [
        ...prevGroceries,
        { name: newItemName.trim(), quantity: newItemQuantity.trim() },
      ]);
      setNewItemName('');
      setNewItemQuantity('');
      showToast('Item added!'); // Show toast when adding a new item
    }
  };

  const handleSaveEdit = () => {
    if (editItemName.trim() !== '') {
      setGroceries((prevGroceries) =>
        prevGroceries.map((item, index) =>
          index === editItemIndex
            ? { name: editItemName.trim(), quantity: editItemQuantity.trim() }
            : item
        )
      );
      setEditItemIndex(null);
      setEditItemName('');
      setEditItemQuantity('');
      showToast('Item updated!'); // Show toast when saving edits
    }
  };

  const handleDelete = (index: number) => {
    setGroceries((prevGroceries) =>
      prevGroceries.filter((_, i) => i !== index)
    );
    showToast('Item deleted!'); // Show toast when deleting an item
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grocery List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {groceries.length === 0 ? (
        <p style={{ padding: '10px' }}>Your grocery list is empty.</p>
        ) : (
          <IonList>
            {groceries.map((item, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{item.name}</h2>
                  <p>{`Quantity: ${item.quantity}`}</p>
                </IonLabel>
                <IonButton
                  onClick={() => {
                    setEditItemIndex(index);
                    setEditItemName(item.name);
                    setEditItemQuantity(item.quantity);
                  }}
                >
                  Edit
                </IonButton>
                <IonButton onClick={() => handleDelete(index)}>Delete</IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonItem>
          <IonLabel>
            <h2>Add New Item</h2>
          </IonLabel>
          <IonInput
            placeholder="Name"
            value={newItemName}
            onIonChange={(e) => setNewItemName(e.detail.value!)}
          />
          <IonInput
            placeholder="Quantity"
            value={newItemQuantity}
            onIonChange={(e) => setNewItemQuantity(e.detail.value!)}
          />
          <IonButton onClick={handleAdd}>Add</IonButton>
        </IonItem>
        {editItemIndex !== null && (
          <IonItem>
            <IonLabel>
              <h2>Edit Item</h2>
            </IonLabel>
            <IonInput
              placeholder="Name"
              value={editItemName}
              onIonChange={(e) => setEditItemName(e.detail.value!)}
            />
            <IonInput
              placeholder="Quantity"
              value={editItemQuantity}
              onIonChange={(e) => setEditItemQuantity(e.detail.value!)}
            />
            <IonButton onClick={handleSaveEdit}>Save</IonButton>
            <IonButton onClick={() => setEditItemIndex(null)}>Cancel</IonButton>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GroceryList;
