export function currentUserHasRight(right_name){
    if(this.$store.getters.getCurrentUser === null)
        return false;
    return this.$store.getters.getCurrentUser.droits.includes(right_name)
}