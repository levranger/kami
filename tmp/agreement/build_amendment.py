from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path
base=Document('/Users/levpolshkov/kami/output/documents/Kami_Aesthetics_NP_Agreement_December_2026.docx')
source={p.text.split(' ',1)[0]:p.text for p in base.paragraphs if p.text.startswith(('5.7 ','5.8 ','5.9 ','5.10 '))}
d=Document(); sec=d.sections[0]
sec.top_margin=Inches(.7);sec.bottom_margin=Inches(.7);sec.left_margin=Inches(.8);sec.right_margin=Inches(.8)
sec.page_width=Inches(8.5);sec.page_height=Inches(11)
for name in ['Normal','Title','Heading 1']:
 st=d.styles[name];st.font.name='Arial';st.font.color.rgb=RGBColor(0,0,0)
 st.paragraph_format.space_after=Pt(7)
d.styles['Normal'].font.size=Pt(10.5);d.styles['Normal'].paragraph_format.line_spacing=1.06
d.styles['Title'].font.size=Pt(17);d.styles['Title'].font.bold=True
d.styles['Heading 1'].font.size=Pt(11);d.styles['Heading 1'].font.bold=True;d.styles['Heading 1'].paragraph_format.space_before=Pt(9)
f=sec.footer.paragraphs[0];f.alignment=2;f.add_run('Kami Aesthetics  |  Amendment  |  Page ').font.size=Pt(8)
fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');f._p.append(fld)
d.add_paragraph('Amendment to Independent Contractor Agreement','Title')
d.add_paragraph('Aventura Aesthetics Group LLC d/b/a Kami Aesthetics and Valeriia Tiertyshnikova APRN')
d.add_paragraph('This Amendment is entered into by Aventura Aesthetics Group LLC d/b/a Kami Aesthetics (Company) and Valeriia Tiertyshnikova, APRN (Contractor), and amends their Independent Contractor Agreement effective April 10, 2026 (Agreement). Pursuant to Section 15.2 of the Agreement, the parties agree to the following changes effective December 1, 2026. Capitalized terms not defined here have the meanings given in the Agreement.')
d.add_paragraph('1 Compensation increase','Heading 1')
d.add_paragraph("For services personally performed by Contractor on or after December 1, 2026, the percentages in Section 5.1 are amended to 35% for Contractor and 65% for Company. Services performed before December 1, 2026 remain payable at the prior applicable rate, even if collected later. Except as expressly clarified below, the definition of Net Collected Revenue, deductions, exclusions, and payment schedule in Section 5 remain unchanged.")
d.add_paragraph("For clarity, treatment revenue includes injectable units and materials administered as part of Contractor's authorized treatments even when the billing system classifies them as product sales. Actual take-home retail skincare and other retail products remain excluded under Section 5.2. Patient-paid processing surcharges are excluded from the compensation base, and processing fees recovered through those surcharges shall not be deducted again. This Amendment does not change any existing lawful tip arrangement.")
d.add_paragraph('2 Review toward 40 percent','Heading 1')
d.add_paragraph('The following provisions are added to Section 5 of the Agreement as Sections 5.6 through 5.9. They establish eligibility for a review and do not create an automatic increase.')
for old,new in [('5.7','5.6'),('5.8','5.7'),('5.9','5.8'),('5.10','5.9')]:
 text=source[old].replace(old+' ',new+' ',1)
 # Match the existing agreement terminology rather than a definition in the superseded replacement draft.
 text=text.replace('35% rate continues','35% rate continues')
 p=d.add_paragraph()
 label,body=text.split('. ',1)
 p.add_run(label+'. ').bold=True;p.add_run(body)
d.add_paragraph('3 Remaining terms','Heading 1')
d.add_paragraph("Except as expressly amended here, all terms of the Agreement remain unchanged and in full force, including its term, renewal, termination, supervision, insurance, training, confidentiality, and restrictive provisions. This Amendment does not restart or extend the current term, release accrued rights, or replace the Agreement. If there is a conflict, this Amendment controls only concerning its subject matter. Further changes require a writing signed by both parties. Counterparts and electronic signatures are permitted as provided in the Agreement.")
d.add_paragraph('Signatures','Heading 1')
d.add_paragraph('The parties sign on the actual dates below and agree to the December 1, 2026 effective date of this Amendment.')
for text in ['COMPANY  Aventura Aesthetics Group LLC d/b/a Kami Aesthetics','Authorized signature: __________________________________________________','Printed name: Lev Polshkov     Title: ______________________________________','Date signed: __________________________','CONTRACTOR  Valeriia Tiertyshnikova APRN','Signature: ___________________________________________________________','Date signed: __________________________']:
 p=d.add_paragraph(text);p.paragraph_format.space_after=Pt(6)
 if text.startswith(('COMPANY','CONTRACTOR')):p.runs[0].bold=True;p.paragraph_format.keep_with_next=True
for root in [d.styles.element,d._element]:
 for node in list(root.iter(qn('w:pBdr'))):node.getparent().remove(node)
for p in d.paragraphs:p.paragraph_format.widow_control=True
out='/Users/levpolshkov/kami/output/documents/Kami_Aesthetics_Compensation_Amendment_December_2026.docx'
d.core_properties.title='Kami Aesthetics Compensation Amendment December 2026';d.core_properties.author='Kami Aesthetics'
d.save(out)
print(out)
print('Words',sum(len(p.text.split()) for p in d.paragraphs))
