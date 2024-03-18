
export function currentUserHasRight(right_name){
    if(this.$store.getters['user/getCurrentUser'] === null)
        return false;
    return this.$store.getters['user/getCurrentUser'].droits.includes(right_name)
}
