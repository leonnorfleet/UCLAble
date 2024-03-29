const uclaBuildings = [
    { value: 'Ackerman Union', label: 'Ackerman Union' },
    { value: 'Anderson School of Management', label: 'Anderson School of Management' },
    { value: 'Armand Hammer Museum of Art and Culture Center', label: 'Armand Hammer Museum of Art and Culture Center' },
    { value: 'Bank of America', label: 'Bank of America' },
    { value: 'Boathouse', label: 'Boathouse' },
    { value: 'Botany Building', label: 'Botany Building' },
    { value: 'Bohnett Residential Center', label: 'Bohnett Residential Center' },
    { value: 'Center for Advanced Surgical and Interventional Technology', label: 'Center for Advanced Surgical and Interventional Technology' },
    { value: 'Center for Heterogeneous Integration and Performance Scaling', label: 'Center for Heterogeneous Integration and Performance Scaling' },
    { value: 'Center for the Art of Performance at UCLA', label: 'Center for the Art of Performance at UCLA' },
    { value: 'Chipotle Mexican Grill', label: 'Chipotle Mexican Grill' },
    { value: 'Court of Sciences', label: 'Court of Sciences' },
    { value: 'Court of Sciences Student Center', label: 'Court of Sciences Student Center' },
    { value: 'CVS Pharmacy', label: 'CVS Pharmacy' },
    { value: 'David Geffen Hall', label: 'David Geffen Hall' },
    { value: 'Dentistry Building', label: 'Dentistry Building' },
    { value: 'Engineering VI', label: 'Engineering VI' },
    { value: 'FedEx Office', label: 'FedEx Office' },
    { value: 'Fowler Museum', label: 'Fowler Museum' },
    { value: 'Franklin D. Murphy Sculpture Garden', label: 'Franklin D. Murphy Sculpture Garden' },
    { value: 'Frisco Building', label: 'Frisco Building' },
    { value: 'Geffen Hall', label: 'Geffen Hall' },
    { value: 'Geology Building', label: 'Geology Building' },
    { value: 'Gonda (Goldschmied) Neuroscience and Genetics Research Center', label: 'Gonda (Goldschmied) Neuroscience and Genetics Research Center' },
    { value: 'Haines Hall', label: 'Haines Hall' },
    { value: 'Hammers Museum', label: 'Hammers Museum' },
    { value: 'Hilltop Structure', label: 'Hilltop Structure' },
    { value: 'Holmby Park', label: 'Holmby Park' },
    { value: 'Inverted Fountain', label: 'Inverted Fountain' },
    { value: 'Janss Steps', label: 'Janss Steps' },
    { value: 'James West Alumni Center', label: 'James West Alumni Center' },
    { value: 'John C. Liebeskind History of Pain Collection', label: 'John C. Liebeskind History of Pain Collection' },
    { value: 'John Wooden Center', label: 'John Wooden Center' },
    { value: 'Kinross Recreation Center', label: 'Kinross Recreation Center' },
    { value: 'Kinsey Pavilion', label: 'Kinsey Pavilion' },
    { value: 'La Kretz Garden Pavilion', label: 'La Kretz Garden Pavilion' },
    { value: 'Los Angeles Community College District (LACCD) Van de Kamp Innovation Center', label: 'Los Angeles Community College District (LACCD) Van de Kamp Innovation Center' },
    { value: 'Los Angeles Country Club', label: 'Los Angeles Country Club' },
    { value: 'Los Angeles Tennis Center', label: 'Los Angeles Tennis Center' },
    { value: 'Marshall Field Building', label: 'Marshall Field Building' },
    { value: 'Math Sciences Building', label: 'Math Sciences Building' },
    { value: 'Meyer and Renee Luskin Conference Center', label: 'Meyer and Renee Luskin Conference Center' },
    { value: 'Mo Ostin Basketball Center', label: 'Mo Ostin Basketball Center' },
    { value: 'Moore Hall', label: 'Moore Hall' },
    { value: 'Murphy Hall', label: 'Murphy Hall' },
    { value: 'Ostin Music Center', label: 'Ostin Music Center' },
    { value: 'Other', label: 'Other' },
    { value: 'Pauley Pavilion', label: 'Pauley Pavilion' },
    { value: 'Physics and Astronomy Building', label: 'Physics and Astronomy Building' },
    { value: 'Powell Library', label: 'Powell Library' },
    { value: 'Public Affairs Building', label: 'Public Affairs Building' },
    { value: 'Public Policy Building', label: 'Public Policy Building' },
    { value: 'Ralph J. Bunche Hall', label: 'Ralph J. Bunche Hall' },
    { value: 'Ralphs', label: 'Ralphs' },
    { value: 'Reagan UCLA Medical Center', label: 'Reagan UCLA Medical Center' },
    { value: 'Recreation - Wooden Center West', label: 'Recreation - Wooden Center West' },
    { value: 'Rieber Hall', label: 'Rieber Hall' },
    { value: 'Rolfe Hall', label: 'Rolfe Hall' },
    { value: 'Ronald Reagan UCLA Medical Center', label: 'Ronald Reagan UCLA Medical Center' },
    { value: 'Royce Hall', label: 'Royce Hall' },
    { value: 'Santa Monica Medical Center', label: 'Santa Monica Medical Center' },
    { value: 'Sculpture Garden at the Hammer Museum', label: 'Sculpture Garden at the Hammer Museum' },
    { value: 'Semel HCI Institute', label: 'Semel HCI Institute' },
    { value: 'Semel Institute for Neuroscience and Human Behavior', label: 'Semel Institute for Neuroscience and Human Behavior' },
    { value: 'Schoenberg Music Building', label: 'Schoenberg Music Building' },
    { value: 'School of Law - Hugh and Hazel Darling Law Library', label: 'School of Law - Hugh and Hazel Darling Law Library' },
    { value: 'Sprint Ranch Reserve', label: 'Sprint Ranch Reserve' },
    { value: 'Starbucks', label: 'Starbucks' },
    { value: 'Sunset Canyon Recreation Center', label: 'Sunset Canyon Recreation Center' },
    { value: 'Terasaki Life Sciences Building', label: 'Terasaki Life Sciences Building' },
    { value: 'The Bruin Bear', label: 'The Bruin Bear' },
    { value: 'The Getty Center', label: 'The Getty Center' },
    { value: 'The Geffen Contemporary at MOCA', label: 'The Geffen Contemporary at MOCA' },
    { value: 'The Hammer Museum', label: 'The Hammer Museum' },
    { value: 'The Meteorite Gallery', label: 'The Meteorite Gallery' },
    { value: 'The Mildred E. Mathias Botanical Garden', label: 'The Mildred E. Mathias Botanical Garden' },
    { value: 'The Stunt Ranch Reserve', label: 'The Stunt Ranch Reserve' },
    { value: 'The University Apartments - North', label: 'The University Apartments - North' },
    { value: 'The University Apartments - South', label: 'The University Apartments - South' },
    { value: 'The Volunteer Center', label: 'The Volunteer Center' },
    { value: 'The Weyburn Terrace', label: 'The Weyburn Terrace' },
    { value: 'Theater and Dance Building', label: 'Theater and Dance Building' },
    { value: 'Tiverton House', label: 'Tiverton House' },
    { value: 'Target', label: 'Target' },
    { value: 'The Mildred E. Mathias Botanical Garden', label: 'The Mildred E. Mathias Botanical Garden' },
    { value: 'The University Apartments - North', label: 'The University Apartments - North' },
    { value: 'The University Apartments - South', label: 'The University Apartments - South' },
    { value: 'The Volunteer Center', label: 'The Volunteer Center' },
    { value: 'The Weyburn Terrace', label: 'The Weyburn Terrace' },
    { value: 'The Wooden Center West', label: 'The Wooden Center West' },
    { value: 'Theater and Dance Building', label: 'Theater and Dance Building' },
    { value: 'Tiverton House', label: 'Tiverton House' },
    { value: 'UCLA Arthur Ashe Student Health and Wellness Center', label: 'UCLA Arthur Ashe Student Health and Wellness Center' },
    { value: 'UCLA Bruin Resource Center', label: 'UCLA Bruin Resource Center' },
    { value: 'UCLA Fielding School of Public Health', label: 'UCLA Fielding School of Public Health' },
    { value: 'UCLA Health Training Center', label: 'UCLA Health Training Center' },
    { value: 'UCLA Lake Arrowhead Conference Center', label: 'UCLA Lake Arrowhead Conference Center' },
    { value: 'UCLA Meteorite Gallery', label: 'UCLA Meteorite Gallery' },
    { value: 'UCLA Meyer & Renee Luskin Conference Center', label: 'UCLA Meyer & Renee Luskin Conference Center' },
    { value: 'UCLA Mildred E. Mathias Botanical Garden', label: 'UCLA Mildred E. Mathias Botanical Garden' },
    { value: 'UCLA Police Department', label: 'UCLA Police Department' },
    { value: 'UCLA Recreation - Wooden Center West', label: 'UCLA Recreation - Wooden Center West' },
    { value: 'UCLA Store', label: 'UCLA Store' },
    { value: 'UCLA Store - Lu Valle Commons', label: 'UCLA Store - Lu Valle Commons' },
    { value: 'UCLA Stunt Ranch Reserve', label: 'UCLA Stunt Ranch Reserve' },
    { value: 'UCLA Volunteer Center', label: 'UCLA Volunteer Center' },
    { value: 'UPS Store', label: 'UPS Store' },
    { value: 'Verizon Wireless', label: 'Verizon Wireless' },
    { value: 'Veterans Park', label: 'Veterans Park' },
    { value: 'Wasserman Football Center', label: 'Wasserman Football Center' },
    { value: 'Westwood Community Council', label: 'Westwood Community Council' },
    { value: 'Westwood Gateway', label: 'Westwood Gateway' },
    { value: 'Westwood Hills Christian Church', label: 'Westwood Hills Christian Church' },
    { value: 'Westwood Presbyterian Church', label: 'Westwood Presbyterian Church' },
    { value: 'Westwood Recreation Center', label: 'Westwood Recreation Center' },
    { value: 'Westwood United Methodist Church', label: 'Westwood United Methodist Church' },
    { value: 'Westwood Village', label: 'Westwood Village' },
    { value: 'Westwood Village Memorial Park Cemetery', label: 'Westwood Village Memorial Park Cemetery' },
    { value: 'Wooden Center West', label: 'Wooden Center West' },
    { value: 'Young Research Library', label: 'Young Research Library' },
];

export default uclaBuildings;
