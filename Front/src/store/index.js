import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import creneau from './modules/creneau';
import emplacementLogistiqueEtType from "@/store/modules/emplacementLogistiqueEtType";
import emplacements from "@/store/modules/emplacements";
import prestationEtType from "@/store/modules/prestationEtType";
import roleEtDroit from "@/store/modules/roleEtDroit";
import stands from "@/store/modules/Stands";
import textsHome from "@/store/modules/textsHome";
import ZoneEtType from "@/store/modules/ZoneEtType";
import avis from "@/store/modules/avis";
import messagerie from "@/store/modules/messages";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        creneau,
        emplacementLogistiqueEtType,
        emplacements,
        prestationEtType,
        roleEtDroit,
        stands,
        textsHome,
        ZoneEtType,
        avis,
        messagerie
    }
});