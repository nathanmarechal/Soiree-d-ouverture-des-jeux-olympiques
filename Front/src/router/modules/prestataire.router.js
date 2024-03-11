import Prestataire from '@/views/Prestataire/Prestataire.vue';
import PrestatairePrestationShowPage from '@/views/Prestataire/Prestation/ShowPrestationPrestatairePage.vue';
import PrestatairePrestationAddPage from '@/views/Prestataire/Prestation/AddPrestatairePrestation.vue';
import PrestatairePrestationEditPage from '@/views/Prestataire/Prestation/EditPrestatatairePrestation.vue';
import PrestataireStatistiquePage from "@/views/Prestataire/Statistique/PrestataireStatistiquePage.vue";
import ShowStandPrestatairePage from "@/views/Prestataire/Stand/ShowStandPrestatairePage.vue";
import CommandePrestatairePage from "@/views/Prestataire/commandes/CommandePrestatairePage.vue";
import AvisPagePrestataire from "@/views/Prestataire/Avis/AvisPagePrestataire.vue";

export const prestataireRoutes = [
    {
    path: '/prestataire',
    component: Prestataire,
    children: [
        { path: 'prestations', name: 'PrestatairePrestationShowView', component: PrestatairePrestationShowPage },
        { path: 'prestations/add', name: 'PrestatairePrestationAddView', component: PrestatairePrestationAddPage },
        { path: 'prestations/edit', name: 'PrestatairePrestationEditView', component: PrestatairePrestationEditPage },
        { path: 'stand', name: 'ShowStandPrestataireView', component: ShowStandPrestatairePage },
        { path: 'statistiques', name: 'PrestataireStatistiqueView', component: PrestataireStatistiquePage },
        { path: 'commandes', name: 'PrestataireCommandesView', component: CommandePrestatairePage },
        { path: 'avis', name: 'PrestataireAvisView', component: AvisPagePrestataire }
    ]
    }
];
