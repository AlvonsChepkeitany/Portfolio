#!/usr/bin/env python3
"""
HUDUMALINK Project Proposal Generator
Generates a comprehensive PDF proposal document
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
)
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Rect, String, Line
from datetime import datetime
import os


class ProposalGenerator:
    def __init__(self, filename="HUDUMALINK_Project_Proposal.pdf"):
        self.filename = filename
        self.doc = SimpleDocTemplate(
            filename,
            pagesize=A4,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=50
        )
        self.story = []
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()

    def _setup_custom_styles(self):
        """Setup custom paragraph styles"""
        self.styles.add(ParagraphStyle(
            name="CustomTitle",
            parent=self.styles["Heading1"],
            fontSize=28,
            textColor=colors.HexColor("#1a237e"),
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName="Helvetica-Bold"
        ))

        self.styles.add(ParagraphStyle(
            name="ColoredHeading1",
            parent=self.styles["Heading1"],
            fontSize=18,
            textColor=colors.HexColor("#283593"),
            spaceAfter=12,
            spaceBefore=20,
            fontName="Helvetica-Bold"
        ))

        self.styles.add(ParagraphStyle(
            name="ColoredHeading2",
            parent=self.styles["Heading2"],
            fontSize=14,
            textColor=colors.HexColor("#3949ab"),
            spaceAfter=10,
            spaceBefore=15,
            fontName="Helvetica-Bold"
        ))

        self.styles.add(ParagraphStyle(
            name="Justify",
            parent=self.styles["BodyText"],
            alignment=TA_JUSTIFY,
            fontSize=11,
            leading=16,
            spaceAfter=12
        ))

        self.styles.add(ParagraphStyle(
            name="CenteredBody",
            parent=self.styles["BodyText"],
            alignment=TA_CENTER,
            fontSize=12,
            spaceAfter=10
        ))

    def add_cover_page(self):
        """Add cover page"""
        self.story.append(Spacer(1, 2*inch))
        
        title = Paragraph("HUDUMALINK", self.styles["CustomTitle"])
        self.story.append(title)
        self.story.append(Spacer(1, 0.3*inch))
        
        subtitle = Paragraph("Digital Service Provider Platform", self.styles["CenteredBody"])
        self.story.append(subtitle)
        self.story.append(Spacer(1, 0.5*inch))
        
        tagline = Paragraph(
            "<i>Connecting Clients with Trusted Service Providers</i>",
            ParagraphStyle("tagline", parent=self.styles["CenteredBody"], fontSize=14,
                          textColor=colors.HexColor("#666666"), italic=True)
        )
        self.story.append(tagline)
        self.story.append(Spacer(1, 1*inch))
        
        doc_type = Paragraph("<b>PROJECT PROPOSAL</b>", self.styles["CenteredBody"])
        self.story.append(doc_type)
        self.story.append(Spacer(1, 1.5*inch))
        
        date_text = Paragraph(
            f"Date: {datetime.now().strftime("%B %d, %Y")}<br/>Version: 1.0",
            self.styles["CenteredBody"]
        )
        self.story.append(date_text)
        self.story.append(Spacer(1, 0.5*inch))
        
        prepared = Paragraph(
            "<b>Prepared by:</b><br/>Alvons Chepkeitany<br/>Senior Software Engineer",
            self.styles["CenteredBody"]
        )
        self.story.append(prepared)
        
        self.story.append(PageBreak())

    def add_executive_summary(self):
        """Add executive summary section"""
        self.story.append(Paragraph("EXECUTIVE SUMMARY", self.styles["ColoredHeading1"]))
        
        texts = [
            """HUDUMALINK is a comprehensive digital platform designed to revolutionize the service provider 
            marketplace in Kenya and beyond. The platform addresses a critical gap in the market by creating 
            a trusted, scalable ecosystem that connects clients with verified service providers across various 
            categories including home services, personal care, professional services, and skilled trades.""",
            
            """In todays fast-paced digital economy, consumers struggle to find reliable service providers, 
            while skilled professionals lack effective platforms to showcase their expertise and grow their 
            customer base. HUDUMALINK solves these challenges by providing a single, trusted platform where 
            quality service delivery meets convenience and transparency.""",
            
            """This proposal outlines the technical architecture, implementation strategy, resource requirements, 
            and financial projections for developing and launching HUDUMALINK. The platform is designed to be 
            scalable, secure, and user-friendly, with a focus on mobile-first accessibility and real-time 
            service delivery tracking."""
        ]
        
        for text in texts:
            self.story.append(Paragraph(text, self.styles["Justify"]))
        
        self.story.append(Spacer(1, 0.3*inch))
        self.story.append(Paragraph("Key Highlights:", self.styles["ColoredHeading2"]))
        
        highlights_data = [
            ["Aspect", "Details"],
            ["Target Market", "Kenya and East Africa"],
            ["Platform Type", "Web & Mobile Application (iOS & Android)"],
            ["Revenue Model", "Commission-based + Premium subscriptions"],
            ["Development Timeline", "6-9 months for MVP"],
            ["Initial Investment", "$150,000 - $250,000"],
            ["Expected ROI", "Break-even in 18-24 months"],
        ]
        
        highlights_table = Table(highlights_data, colWidths=[2.5*inch, 4*inch])
        highlights_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#283593")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 12),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        
        self.story.append(highlights_table)
        self.story.append(PageBreak())

    def add_objectives(self):
        """Add project objectives section"""
        self.story.append(Paragraph("PROJECT OBJECTIVES", self.styles["ColoredHeading1"]))
        self.story.append(Paragraph("Main Objective", self.styles["ColoredHeading2"]))
        
        main_obj = """To create a scalable digital platform that connects clients with trusted service providers, 
        ensuring convenient, reliable access to services while helping providers grow their skills, 
        credibility, and customer reach."""
        self.story.append(Paragraph(main_obj, self.styles["Justify"]))
        self.story.append(Spacer(1, 0.2*inch))
        
        self.story.append(Paragraph("Sub-Objectives", self.styles["ColoredHeading2"]))
        
        objectives = [
            ("1. Single Trusted Platform",
             "Provide one reliable place where clients can easily discover, book, and pay for verified service providers. The platform will implement robust verification processes, including background checks, skill assessments, and customer reviews to ensure quality and trust."),
            ("2. Digital Access to Services",
             "Enable users to book, track, and pay for home and personal services online for greater efficiency. The platform will feature real-time booking, GPS tracking of service providers, digital payment integration, and automated scheduling to streamline the entire service delivery process."),
            ("3. Save Time and Increase Convenience",
             "Reduce effort for clients by simplifying service search, booking, and communication. Advanced search filters, instant matching algorithms, and in-app communication tools will enable clients to find and hire service providers within minutes rather than hours or days."),
            ("4. Promote Entrepreneurship",
             "Support service providers in showcasing their skills, gaining customers, and building sustainable income. The platform will provide tools for portfolio building, customer relationship management, earnings tracking, and professional development through training resources and certification programs.")
        ]
        
        for title, desc in objectives:
            self.story.append(Paragraph(f"<b>{title}</b>", self.styles["BodyText"]))
            self.story.append(Paragraph(desc, self.styles["Justify"]))
            self.story.append(Spacer(1, 0.15*inch))
        
        self.story.append(PageBreak())

    def create_architecture_diagram(self):
        """Create system architecture diagram"""
        d = Drawing(400, 350)
        d.add(String(200, 330, "HUDUMALINK System Architecture", fontSize=14, textAnchor="middle", fontName="Helvetica-Bold"))
        
        # Client Layer
        d.add(Rect(50, 270, 130, 40, fillColor=colors.HexColor("#E3F2FD"), strokeColor=colors.blue))
        d.add(String(115, 290, "Client Apps", fontSize=10, textAnchor="middle", fontName="Helvetica-Bold"))
        d.add(String(115, 275, "Web | iOS | Android", fontSize=8, textAnchor="middle"))
        
        d.add(Rect(220, 270, 130, 40, fillColor=colors.HexColor("#E3F2FD"), strokeColor=colors.blue))
        d.add(String(285, 290, "Provider Apps", fontSize=10, textAnchor="middle", fontName="Helvetica-Bold"))
        d.add(String(285, 275, "Web | iOS | Android", fontSize=8, textAnchor="middle"))
        
        # API Gateway Layer
        d.add(Line(115, 270, 115, 250))
        d.add(Line(285, 270, 285, 250))
        d.add(Rect(100, 210, 200, 40, fillColor=colors.HexColor("#FFF3E0"), strokeColor=colors.orange))
        d.add(String(200, 235, "API Gateway", fontSize=10, textAnchor="middle", fontName="Helvetica-Bold"))
        d.add(String(200, 220, "REST API | GraphQL | WebSocket", fontSize=8, textAnchor="middle"))
        
        # Business Logic Layer
        d.add(Line(200, 210, 200, 190))
        d.add(Rect(50, 130, 300, 60, fillColor=colors.HexColor("#E8F5E9"), strokeColor=colors.green))
        d.add(String(200, 170, "Business Logic Layer", fontSize=10, textAnchor="middle", fontName="Helvetica-Bold"))
        
        services = ["User Service", "Booking Engine", "Payment Gateway", "Notification", "Analytics"]
        for i, service in enumerate(services):
            d.add(String(60 + i*60, 145, service, fontSize=7, textAnchor="middle"))
        
        # Database Layer
        d.add(Line(200, 130, 200, 110))
        d.add(Rect(50, 50, 130, 60, fillColor=colors.HexColor("#F3E5F5"), strokeColor=colors.purple))
        d.add(String(115, 90, "Primary Database", fontSize=9, textAnchor="middle", fontName="Helvetica-Bold"))
        d.add(String(115, 75, "PostgreSQL", fontSize=8, textAnchor="middle"))
        
        d.add(Rect(220, 50, 130, 60, fillColor=colors.HexColor("#F3E5F5"), strokeColor=colors.purple))
        d.add(String(285, 90, "Cache & Real-time", fontSize=9, textAnchor="middle", fontName="Helvetica-Bold"))
        d.add(String(285, 75, "Redis | Firebase", fontSize=8, textAnchor="middle"))
        
        return d

    def add_technical_architecture(self):
        """Add technical architecture section"""
        self.story.append(Paragraph("TECHNICAL ARCHITECTURE", self.styles["ColoredHeading1"]))
        
        intro = """HUDUMALINK will be built using a modern, scalable microservices architecture that ensures 
        high availability, performance, and maintainability. The system is designed with security, 
        scalability, and user experience as primary considerations."""
        self.story.append(Paragraph(intro, self.styles["Justify"]))
        self.story.append(Spacer(1, 0.2*inch))
        
        self.story.append(Paragraph("System Architecture Overview", self.styles["ColoredHeading2"]))
        self.story.append(self.create_architecture_diagram())
        self.story.append(Spacer(1, 0.3*inch))
        
        self.story.append(Paragraph("Technology Stack", self.styles["ColoredHeading2"]))
        
        tech_stack = [
            ["Layer", "Technologies", "Purpose"],
            ["Frontend Web", "React.js, Next.js, TypeScript, Tailwind CSS", "Responsive web application with SSR"],
            ["Mobile Apps", "React Native, Flutter", "Cross-platform iOS & Android apps"],
            ["Backend", "Node.js, Express.js, Python (Django/FastAPI)", "RESTful APIs and business logic"],
            ["Database", "PostgreSQL (primary), MongoDB (analytics), Redis (cache)", "Data persistence and caching"],
            ["Real-time", "Socket.io, Firebase Real-time DB", "Live updates and notifications"],
            ["Payment", "M-Pesa, PayPal, Stripe", "Multiple payment gateways"],
            ["Cloud/DevOps", "AWS/GCP, Docker, Kubernetes, CI/CD", "Scalable infrastructure"],
            ["Monitoring", "New Relic, Sentry, CloudWatch", "Performance and error tracking"],
        ]
        
        tech_table = Table(tech_stack, colWidths=[1.2*inch, 2.3*inch, 2.5*inch])
        tech_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#283593")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 10),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("FONTSIZE", (0, 1), (-1, -1), 8),
        ]))
        
        self.story.append(tech_table)
        self.story.append(PageBreak())

    def add_features(self):
        """Add features section"""
        self.story.append(Paragraph("FEATURES & FUNCTIONALITY", self.styles["ColoredHeading1"]))
        
        intro = """HUDUMALINK will offer a comprehensive suite of features designed to provide exceptional 
        user experience for both clients and service providers."""
        self.story.append(Paragraph(intro, self.styles["Justify"]))
        self.story.append(Spacer(1, 0.2*inch))
        
        self.story.append(Paragraph("For Clients", self.styles["ColoredHeading2"]))
        
        client_features = [
            ["Feature", "Description"],
            ["Service Discovery", "Advanced search with filters by category, location, price, ratings, and availability"],
            ["Provider Profiles", "Detailed profiles with photos, skills, certifications, reviews, and work portfolio"],
            ["Real-time Booking", "Instant booking with calendar integration and automated confirmation"],
            ["Secure Payments", "Multiple payment options including M-Pesa, cards, and digital wallets"],
            ["Live Tracking", "GPS tracking of service provider en route to appointment"],
            ["In-app Chat", "Direct messaging with service providers for clarifications"],
            ["Service History", "Complete record of past bookings and transactions"],
            ["Ratings & Reviews", "Leave detailed feedback and view provider reputation"],
        ]
        
        client_table = Table(client_features, colWidths=[1.8*inch, 4.2*inch])
        client_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#283593")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 11),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("FONTSIZE", (0, 1), (-1, -1), 9),
        ]))
        
        self.story.append(client_table)
        self.story.append(PageBreak())

    def add_implementation_plan(self):
        """Add implementation timeline"""
        self.story.append(Paragraph("IMPLEMENTATION PLAN", self.styles["ColoredHeading1"]))
        
        intro = """The HUDUMALINK platform will be developed in multiple phases using an Agile methodology, 
        allowing for iterative development, continuous feedback, and flexibility to adapt to market needs."""
        self.story.append(Paragraph(intro, self.styles["Justify"]))
        self.story.append(Spacer(1, 0.2*inch))
        
        phases = [
            ["Phase", "Duration", "Key Deliverables"],
            ["Phase 1: Planning & Design", "4 weeks", "Requirements analysis, UI/UX design, technical architecture, database design"],
            ["Phase 2: MVP Development", "12 weeks", "Core booking system, user authentication, basic payment integration, mobile apps"],
            ["Phase 3: Testing & QA", "4 weeks", "Comprehensive testing, bug fixes, security audits, performance optimization"],
            ["Phase 4: Beta Launch", "4 weeks", "Limited release, user feedback collection, iterations based on feedback"],
            ["Phase 5: Full Launch", "2 weeks", "Marketing campaign, full platform release, customer support setup"],
        ]
        
        phases_table = Table(phases, colWidths=[2*inch, 1.5*inch, 2.5*inch])
        phases_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#283593")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("FONTSIZE", (0, 1), (-1, -1), 9),
        ]))
        
        self.story.append(phases_table)
        self.story.append(PageBreak())

    def add_budget(self):
        """Add budget section"""
        self.story.append(Paragraph("BUDGET & FINANCIAL PROJECTIONS", self.styles["ColoredHeading1"]))
        
        intro = """This section provides a detailed breakdown of the estimated costs for developing and launching 
        the HUDUMALINK platform, along with projected revenue streams and break-even analysis."""
        self.story.append(Paragraph(intro, self.styles["Justify"]))
        self.story.append(Spacer(1, 0.2*inch))
        
        self.story.append(Paragraph("Development Costs (MVP)", self.styles["ColoredHeading2"]))
        
        dev_costs = [
            ["Category", "Details", "Cost (USD)"],
            ["Personnel Costs", "Development team salaries (6 months)", "$120,000"],
            ["Infrastructure", "Cloud hosting, domains, SSL certificates", "$8,000"],
            ["Third-party Services", "Payment gateways, SMS, email services", "$5,000"],
            ["Design & Branding", "Logo, UI/UX design, marketing materials", "$12,000"],
            ["Legal & Compliance", "Business registration, terms of service, privacy policy", "$8,000"],
            ["Testing & QA", "Testing tools, security audits", "$6,000"],
            ["Marketing & Launch", "Initial marketing campaign, PR", "$25,000"],
            ["Contingency (15%)", "Buffer for unexpected expenses", "$27,600"],
            ["<b>TOTAL</b>", "", "<b>$211,600</b>"],
        ]
        
        costs_table = Table(dev_costs, colWidths=[2*inch, 2.8*inch, 1.2*inch])
        costs_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#283593")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("ALIGN", (2, 0), (2, -1), "RIGHT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 1), (-1, -2), colors.beige),
            ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#FFE082")),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("FONTSIZE", (0, 1), (-1, -1), 9),
        ]))
        
        self.story.append(costs_table)
        self.story.append(Spacer(1, 0.3*inch))
        
        self.story.append(Paragraph("Revenue Model", self.styles["ColoredHeading2"]))
        
        revenue_streams = [
            ["Revenue Stream", "Description", "Rate/Fee"],
            ["Service Commission", "Commission on each completed booking", "15-20% of service fee"],
            ["Provider Subscriptions", "Premium features for service providers", "$20-50/month"],
            ["Featured Listings", "Enhanced visibility in search results", "$30-100/month"],
            ["Advertising", "Promoted services and banner ads", "Variable"],
        ]
        
        revenue_table = Table(revenue_streams, colWidths=[2*inch, 2.5*inch, 1.5*inch])
        revenue_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2e7d32")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("FONTSIZE", (0, 1), (-1, -1), 9),
        ]))
        
        self.story.append(revenue_table)
        self.story.append(PageBreak())

    def add_conclusion(self):
        """Add conclusion"""
        self.story.append(Paragraph("CONCLUSION & NEXT STEPS", self.styles["ColoredHeading1"]))
        
        conclusions = [
            """HUDUMALINK represents a significant opportunity to transform the service provider marketplace 
            in Kenya and East Africa. By leveraging modern technology, user-centric design, and a robust 
            business model, the platform is positioned to become the go-to solution for connecting clients 
            with trusted service providers.""",
            
            """The platform addresses real pain points in the market: clients struggle to find reliable service 
            providers, while skilled professionals lack effective channels to reach customers. HUDUMALINK 
            bridges this gap with a comprehensive digital solution that benefits all stakeholders.""",
            
            """With a solid technical architecture, clear implementation roadmap, and sustainable revenue model, 
            HUDUMALINK is well-positioned for success. The phased development approach minimizes risk while 
            allowing for rapid iteration based on user feedback."""
        ]
        
        for text in conclusions:
            self.story.append(Paragraph(text, self.styles["Justify"]))
        
        self.story.append(Spacer(1, 0.3*inch))
        self.story.append(Paragraph("Immediate Next Steps", self.styles["ColoredHeading2"]))
        
        next_steps = [
            "Secure initial funding and finalize budget allocation",
            "Assemble core development team and assign roles",
            "Begin detailed requirements gathering and user research",
            "Create detailed UI/UX wireframes and prototypes",
            "Set up development infrastructure and tools",
            "Establish partnerships with payment providers",
            "Begin MVP development following Agile methodology",
        ]
        
        for i, step in enumerate(next_steps, 1):
            self.story.append(Paragraph(f"{i}. {step}", self.styles["BodyText"]))
            self.story.append(Spacer(1, 0.1*inch))
        
        self.story.append(Spacer(1, 0.3*inch))
        
        contact = Paragraph(
            "<b>For more information or to discuss this proposal, please contact:</b><br/>"
            "Alvons Chepkeitany<br/>"
            "Senior Software Engineer<br/>"
            "Email: alvonschepkeitany@gmail.com<br/>"
            "Phone: +254 795 285 206",
            self.styles["BodyText"]
        )
        self.story.append(contact)

    def generate(self):
        """Generate the complete PDF document"""
        print("Generating HUDUMALINK Project Proposal...")
        
        self.add_cover_page()
        self.add_executive_summary()
        self.add_objectives()
        self.add_technical_architecture()
        self.add_features()
        self.add_implementation_plan()
        self.add_budget()
        self.add_conclusion()
        
        self.doc.build(self.story)
        print(f"✓ Proposal generated successfully: {self.filename}")
        print(f"✓ File size: {os.path.getsize(self.filename) / 1024:.2f} KB")


if __name__ == "__main__":
    generator = ProposalGenerator()
    generator.generate()
