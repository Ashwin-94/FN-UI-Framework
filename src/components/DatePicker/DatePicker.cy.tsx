import DateField from './DatePicker'; // Adjust the import path based on your project structure
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css'; 
import { mount } from '@cypress/react';


describe('<DateField />', () => {

  function formatDate(date: Date) {
    let month: any = date.getMonth() + 1; // Months are zero-based in JavaScript
    let day: any = date.getDate();
    let year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${month}/${day}/${year}`;
  }

  it('renders', () => {
    mount(<DateField name={''} />);
    cy.screenshot('component/DateField/renders');
  });

  it('displays the correct value', () => {
    const value = new Date(); // Example date value
    const formattedValue = formatDate(value); 
    mount(<DateField value={value} id="date-input" label="Label for date" name={''} />);
    cy.get('input#fn-date-picker').should('have.value', formattedValue);
    cy.screenshot('component/DateField/displays the correct value');
  });

  it('calls onSelect when value changes', () => {
    const handleChange = cy.stub().as('handleChange');
    mount(<DateField id="date-input" label="Label for date" onSelect={handleChange} name={''} />);
    const newValue = new Date(2023, 0, 1); // Example new date value
    const formattedNewValue = formatDate(newValue); 
    cy.get('input#fn-date-picker').clear().type(formattedNewValue);
    cy.get('@handleChange').should('have.been.called');
    cy.screenshot('component/DateField/calls onSelect when value changes');
  });

  it('calls onBlur when value changes', () => {
    const handleChange = cy.stub().as('handleChange');
    mount(<DateField id="date-input" label="Label for date" onBlur={handleChange} name={''} />);
    const newValue = new Date(2023, 0, 1); // Example new date value
    const formattedNewValue = formatDate(newValue); // Format the new date
    cy.get('input#fn-date-picker').clear().type(formattedNewValue).blur();
    cy.get('@handleChange').should('have.been.called');
    cy.screenshot('component/DateField/calls onBlur when value changes');
  });

  it('calls onFocus when value changes', () => {
    const handleChange = cy.stub().as('handleChange');
    mount(<DateField id="date-input" label="Label for date" onFocus={handleChange} name={''} />);
    const newValue = new Date(2023, 0, 1); // Example new date value
    const formattedNewValue = formatDate(newValue); // Format the new date
    cy.get('input#fn-date-picker').clear().type(formattedNewValue);
    cy.get('@handleChange').should('have.been.called');
    cy.screenshot('component/DateField/calls onFocus when value changes');
  });
  

  it('is disabled when disabled prop is true', () => {
    mount(<DateField id="date-input" label="Label for date" disabled name={''} />);
    cy.get('input#fn-date-picker').should('be.disabled');
    cy.screenshot('component/DateField/is disabled when disabled prop is true');
  });

  it('applies invalid state when invalid prop is true', () => {
    mount(<DateField id="date-input" label="Label for date" invalid name={''} />);
    cy.get('.p-calendar').should('have.class', 'p-invalid');
    cy.screenshot('component/DateField/applies invalid state when invalid prop is true');
  });

  it('applies custom class name', () => {
    const className = 'custom-date-input';
    mount(<DateField id="date-input" label="Label for date" className={className} name={''} />);
    cy.get('.p-calendar').should('have.class', className);
    cy.screenshot('component/DateField/applies custom class name');
  });

  it('renders with specified size', () => {
    mount(<DateField id="date-input" label="Label for date" size="sm" name={''} />);
    cy.get('input#fn-date-picker').should('have.class', 'p-inputtext-sm');
    cy.screenshot('component/DateField/renders with specified size');
  });

  it('applies unstyled when unstyled prop is true', () => {
    mount(<DateField id="date-input" label="Label for date" unstyled name={''} />);
    cy.get('input#fn-date-picker').should('have.class', 'p-inputtext');
    cy.screenshot('component/DateField/applies unstyled when unstyled prop is true');
  });
});
