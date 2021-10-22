import { FunctionalMixin } from './FunctionalMixin'

export const SubclassFactory = (behaviour) => {
    let mixBehaviourInto = FunctionalMixin(behaviour);
    return (superclazz) => mixBehaviourInto(class extends superclazz { });
}