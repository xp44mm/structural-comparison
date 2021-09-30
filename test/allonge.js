const mustBeLoggedIn = () => {
    if (currentUser() == null)
        throw new PermissionsException("Must be logged in!");
}
const mustBeMe = () => {
    if (currentUser() == null || !currentUser().person().equals(this))
        throw new PermissionsException("Must be me!");
}
const Person =
    HasAge(
        beforeAll(mustBeMe, 'setName', 'setAge', 'age')(
            beforeAll(mustBeLoggedIn, 'fullName')(
                class {
                    setName(first, last) {
                        this.firstName = first;
                        this.lastName = last;
                    }
                    fullName() {
                        return this.firstName + " " + this.lastName;
                    }
                }
            )
        )
    );

const mustBeLoggedIn = () => {
    if (currentUser() == null)
        throw new PermissionsException("Must be logged in!");
}
const mustBeMe = () => {
    if (currentUser() == null || !currentUser().person().equals(this))
        throw new PermissionsException("Must be me!");
}
const Person = compose(
    HasAge,
    beforeAll(mustBeMe, 'setName', 'setAge', 'age'),
    beforeAll(mustBeLoggedIn, 'fullName'),
)(class {
    setName(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
    fullName() {
        return this.firstName + " " + this.lastName;
    }
});