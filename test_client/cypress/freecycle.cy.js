describe('FreeCycle', () => {

	const is_a_number = value => {
		expect(Number.isNaN(+value), 'input should be a number').to.eq(false)
	}


	// FreeCycle Commands ------------------------------------------------------
	Cypress.Commands.add('item_field_entry', (kwargs) => {
		for (let [k,v] of Object.entries(kwargs)) {
			cy.get(`[name="${k}"]`).filter(':visible').clear().type(v)
		}
	})

	Cypress.Commands.add('create_item', (kwargs) => {
		const uuid = Cypress._.random(0, 1e6);
		kwargs = {
			...{
				user_id: 'test_user',   // HACK - Simplify Client
				lat: '1',
				lon: '1',
				description: 'item from cypress test',
				keywords: 'item1, item2, item3',
			},
			...kwargs,
		}
		kwargs.description += uuid
		cy.item_field_entry(kwargs)
		cy.get(`[data-action="create_item"]`).filter(':visible').click()
		return cy.contains(uuid).should('be.visible').parents('li').find('[data-field="id"]').invoke('text')
	})

	Cypress.Commands.add('delete_item', (item_id) => {
		cy.contains(`[data-field="id"]`, item_id).should('exist');
		cy.contains(`[data-field="id"]`, item_id).parents("li").find(`[data-action="delete"]`).click();
		cy.contains(`[data-field="id"]`, item_id).should('not.exist');
	})

	// Each --------------------------------------------------------------------

	beforeEach(() => {
		cy.visit('');  // Navigate to Env variable `CYPRESS_BASE_URL`
	})

	// Tests -------------------------------------------------------------------


	it('root page loads without error', () => {
	})

	it('root page contains text freecycle', () => {
		cy.contains('freecycle', { matchCase: false })
	})

	it('contains input fields and submit button', () => {
		cy.item_field_entry({
			user_id: 'test',
			lat: 'test',
			lon: 'test',
			description: 'test',
			image: 'test',
			keywords: 'test',
		})
		cy.get(`[data-action="create_item"]`).filter(':visible')
	})

	it('post results in item visible', () => {
		cy.contains('this should be visible').should('not.exist')
		cy.item_field_entry({
			user_id: 'test',
			lat: '1',
			lon: '1',
			description: 'this should be visible',
			image: 'http://placekitten.com/100/101',
			keywords: 'test',
		})
		cy.get(`[data-action="create_item"]`).filter(':visible').click()
		cy.get(`ul`).filter(':visible').contains('this should be visible').should('exist')
	})

	it('Create and Delete Item', () => {
		cy.create_item()
			.then(item_id => {
				cy.delete_item(item_id);
			})
	})

})