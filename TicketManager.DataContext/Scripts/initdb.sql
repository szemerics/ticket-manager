-- Movies
INSERT INTO Movies (Title, [Year], [Description], LengthInMinutes, MinimumAge, IsDeleted, Categories, PosterUrl)  
VALUES 
('Interstellar', 2014, 'A team of explorers travel through a wormhole in space to ensure humanity’s survival, facing time dilation, distant galaxies, and emotional challenges.', 169, 10, 0, '[0,7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
('The Dark Knight', 2008, 'Batman faces the Joker, a criminal mastermind who pushes Gotham into chaos, forcing the hero to confront his own moral limits and the true meaning of justice.', 152, 12, 0, '[0,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
('Inception', 2010, 'A skilled thief who steals secrets through dreams is offered a chance to have his past erased, but only if he can plant an idea in someone’s subconscious.', 148, 12, 0, '[0,17,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'),
('The Matrix', 1999, 'A hacker learns that reality is a simulation and joins a rebellion to fight intelligent machines, discovering his destiny as "The One" in a cyberpunk world.', 136, 15, 0, '[0,17]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg'),
('Titanic', 1997, 'A poor artist and an aristocratic woman fall in love aboard the ill-fated RMS Titanic, defying social norms and enduring tragedy as the ship sinks.', 194, 12, 0, '[16,7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'),
('The Shawshank Redemption', 1994, 'Wrongly imprisoned for murder, a man maintains hope and friendship as he plans a daring escape from prison over decades, transforming those around him.', 142, 15, 0, '[7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'),
('Pulp Fiction', 1994, 'Intertwined tales of violence and redemption in Los Angeles follow gangsters, a boxer, and hitmen in a nonlinear narrative filled with dark humor and grit.', 154, 18, 0, '[5,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg'),
('Forrest Gump', 1994, 'A simple man with a big heart recounts his accidental influence on historic events and his unwavering love for his childhood friend, Jenny.', 142, 10, 0, '[7,16]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'),
('The Godfather', 1972, 'A mafia patriarch hands over the reins of his crime empire to his reluctant son, setting off a tale of power, loyalty, and the cost of family legacy.', 175, 15, 0, '[5,7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'),
('Fight Club', 1999, 'An insomniac office worker forms an underground fight club with a soap salesman, leading to chaos and a startling revelation about identity.', 139, 18, 0, '[7,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'),
('The Empire Strikes Back', 1980, 'The rebels suffer a major defeat by the Empire, while Luke Skywalker seeks Jedi training and faces shocking truths about his lineage.', 124, 8, 0, '[0,1,17]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg'),
('Gladiator', 2000, 'A betrayed Roman general seeks revenge as a gladiator, fighting for justice and to honor his murdered family in the corrupt empire of Rome.', 155, 15, 0, '[0,7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'),
('Jurassic Park', 1993, 'Cloned dinosaurs escape containment on a theme park island, forcing scientists and visitors into a desperate fight for survival amid prehistoric terror.', 127, 10, 0, '[0,17]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/fjTU1Bgh3KJu4aatZil3sofR2zC.jpg'),
('The Lion King', 1994, 'A lion cub flees after tragedy but must embrace his destiny and return to save his homeland from a tyrannical ruler and reclaim his rightful place.', 88, 6, 0, '[2,8]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg'),
('Avengers: Endgame', 2019, 'The Avengers reunite for one last mission to reverse a cosmic catastrophe, traveling through time and facing great loss to save the universe.', 181, 12, 0, '[0,20]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'),
('The Lord of the Rings: The Fellowship of the Ring', 2001, 'A hobbit and his allies begin a perilous journey to destroy a powerful ring and stop a dark lord''s rise in a mythical world filled with danger and hope.', 178, 12, 0, '[0,1,9]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg'),
('Star Wars: A New Hope', 1977, 'A young farm boy joins the Rebel Alliance, learning the ways of the Force to fight against the oppressive Galactic Empire and its deadly weapon.', 121, 8, 0, '[0,17]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg'),
('Back to the Future', 1985, 'A teenager is accidentally sent back in time and must ensure his parents fall in love to secure his own existence while finding a way home.', 116, 8, 0, '[1,17]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg'),
('The Silence of the Lambs', 1991, 'A young FBI trainee seeks help from a brilliant but dangerous serial killer to catch another murderer who skins his victims, racing against time.', 118, 18, 0, '[21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg'),
('Schindler''s List', 1993, 'A German businessman saves the lives of over a thousand Jews during the Holocaust, risking everything as he witnesses the horrors of war firsthand.', 195, 15, 0, '[3,7,11]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg'),
('The Green Mile', 1999, 'A death row guard discovers an inmate with miraculous powers, forcing him to question justice, humanity, and the mysteries of life and death.', 189, 15, 0, '[7,9]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg'),
('Spirited Away', 2001, 'A young girl enters a magical world ruled by spirits and gods, where she must work, adapt, and outwit supernatural beings to save her parents.', 125, 8, 0, '[2,9]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'),
('The Departed', 2006, 'An undercover cop infiltrates the mob while a mole rises in the police force, leading to a tense game of deception and deadly consequences.', 151, 18, 0, '[5,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/nT97ifVT2J1yMQmeq20Qblg61T.jpg'),
('Mad Max: Fury Road', 2015, 'In a post-apocalyptic wasteland, a drifter and a rebel leader fight for freedom from a tyrant in a relentless, high-octane desert chase.', 120, 15, 0, '[0,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hA2ple9q4qnwxp3hKVNhroipsir.jpg'),
('Parasite', 2019, 'A poor family cons its way into working for a wealthy household, but unexpected twists unravel their plan in a darkly comic tale of inequality.', 132, 15, 0, '[7,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/4DGPORlVIDIQvsuSDnM4uXKMjWS.jpg'),
('Jaws', 1975, 'A massive shark terrorizes a coastal town, prompting a police chief, scientist, and fisherman to hunt the creature in a battle for survival.', 124, 12, 0, '[21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lxM6kqilAdpdhqUl2biYp5frUxE.jpg'),
('Alien', 1979, 'A space crew responds to a distress call and unknowingly brings aboard a deadly alien lifeform, fighting for survival in deep space.', 117, 15, 0, '[17,12]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg'),
('Toy Story', 1995, 'Toys come to life when humans aren''t around, and a new arrival threatens the bond between a cowboy doll and a space ranger in this adventure.', 81, 6, 0, '[2,8]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg'),
('The Big Lebowski', 1998, 'A slacker becomes entangled in a kidnapping case after being mistaken for someone else, navigating absurd situations and bowling alleys.', 117, 15, 0, '[4,5]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/9mprbw31MGdd66LR0AQKoDMoFRv.jpg'),
('Blade Runner', 1982, 'In a dystopian future, a blade runner hunts rogue androids while questioning what it means to be human in a world blurred by artificial life.', 117, 15, 0, '[17,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg'),
('The Avengers', 2012, 'Earth''s mightiest heroes must learn to work together to stop a powerful alien invasion led by Loki, threatening global destruction.', 143, 12, 0, '[0,20]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'),
('Whiplash', 2014, 'A young drummer enrolls in a music conservatory and faces brutal training under a perfectionist instructor, testing his limits and ambition.', 107, 12, 0, '[7,13]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7fn624j5lj3xTme2SgiLCeuedmO.jpg'),
('Django Unchained', 2012, 'A freed slave joins a bounty hunter on a quest to rescue his wife from a brutal plantation owner in a bloody, stylish tale of vengeance.', 165, 18, 0, '[7,23]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg'),
('The Grand Budapest Hotel', 2014, 'A concierge and his protégé become embroiled in a murder mystery involving a stolen painting and a wealthy family in a fictional Europe.', 99, 12, 0, '[4,7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg'),
('Memento', 2000, 'A man suffering from short-term memory loss hunts his wife''s killer using tattoos and notes, struggling to separate truth from illusion.', 113, 15, 0, '[15,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/fKTPH2WvH8nHTXeBYBVhawtRqtR.jpg'),
('No Country for Old Men', 2007, 'A hunter discovers a briefcase of money and becomes the target of a relentless killer in a bleak, violent tale of chance and fate.', 122, 18, 0, '[21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/bj1v6YKF8yHqA489VFfnQvOJpnc.jpg'),
('Saving Private Ryan', 1998, 'During WWII, soldiers embark on a perilous mission to find and return home the last surviving brother of a family who lost the rest in battle.', 169, 15, 0, '[0,22]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg'),
('The Truman Show', 1998, 'A man discovers his entire life is a scripted TV show, prompting an existential journey to find truth, freedom, and his real identity.', 103, 10, 0, '[7]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vuza0WqY239yBXOadKlGwJsZJFE.jpg'),
('Se7en', 1995, 'Two detectives hunt a serial killer who uses the seven deadly sins as motives for his crimes, leading to a disturbing and unforgettable ending.', 127, 18, 0, '[5,21]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg'),
('The Wolf of Wall Street', 2013, 'A stockbroker rises to outrageous wealth through fraud and excess, descending into a whirlwind of drugs, women, and federal investigations.', 180, 18, 0, '[3,4]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg'),
('La La Land', 2016, 'A jazz musician and an aspiring actress pursue their dreams and fall in love, facing the reality of ambition and the choices it demands.', 128, 12, 0, '[7,13,16]', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg');

 
 -- Users
 INSERT INTO Users ([Name], Email, Phone, IsDeleted, PasswordHash) 
 VALUES 
 ('Hugh Jackman', 'hugh.jackman@example.com', '06302224567', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Emma Watson', 'emma.watson@example.com', '06302224568', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Chris Hemsworth', 'chris.hemsworth@example.com', '06302224569', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Scarlett Johansson', 'scarlett.johansson@example.com', '06302224570', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Robert Downey Jr', 'robert.downey@example.com', '06302224571', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Natalie Portman', 'natalie.portman@example.com', '06302224572', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Tom Hanks', 'tom.hanks@example.com', '06302224573', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Margot Robbie', 'margot.robbie@example.com', '06302224574', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Ryan Reynolds', 'ryan.reynolds@example.com', '06302224575', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Gal Gadot', 'gal.gadot@example.com', '06302224576', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Leonardo DiCaprio', 'leonardo.dicaprio@example.com', '06302224577', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Zendaya', 'zendaya@example.com', '06302224578', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Brad Pitt', 'brad.pitt@example.com', '06302224579', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Angelina Jolie', 'angelina.jolie@example.com', '06302224580', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Chris Evans', 'chris.evans@example.com', '06302224581', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Anne Hathaway', 'anne.hathaway@example.com', '06302224582', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Dwayne Johnson', 'dwayne.johnson@example.com', '06302224583', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Jennifer Lawrence', 'jennifer.lawrence@example.com', '06302224584', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Keanu Reeves', 'keanu.reeves@example.com', '06302224585', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy'),
 ('Tom Cruise', 'tom.cruise@example.com', '06302224586', 0, '$2a$11$EyYSy4m97hAxTW2voQw9nu1LM4M1HWV0Ipw2HXhn4jHiqANGkGMUy');
 
 -- RoleUser
 INSERT INTO RoleUser (RolesId, UsersId) 
 VALUES 
 (1, 1),  -- Admin
 (2, 1),  -- Cashier
 (3, 1),  -- Cashier
 (1, 2),  -- Admin
 (2, 2),  -- Cashier
 (3, 2),  -- Customer
 --- Admin Users Above
 (3, 3),  -- Cashier
 (3, 4),  -- Cashier
 (3, 5),  -- Cashier
 (2, 6),  -- Customer
 (2, 7),  -- Customer
 (2, 8),  -- Customer
 (2, 9),  -- Customer
 (2, 10), -- Customer
 (2, 11), -- Customer
 (2, 12), -- Customer
 (2, 13), -- Customer
 (2, 14), -- Customer
 (2, 15), -- Customer
 (2, 16), -- Customer
 (2, 17), -- Customer
 (2, 18), -- Customer
 (2, 19), -- Customer
 (2, 20); -- Customer
 
 -- Rooms
 INSERT INTO Rooms ([Name], RowNumber, IsDeleted, ColumnNumber) 
 VALUES 
 ('Room 1', 5, 0, 6),
 ('Room 2', 4, 0, 5),
 ('Room 3', 6, 0, 7),
 ('Room 4', 5, 0, 4),
 ('Room 5', 7, 0, 6),
 ('Room 6', 4, 0, 7);
 
 -- Screenings
 INSERT INTO Screenings (MovieId, ScreeningTime, RoomId, IsDeleted, ScreeningPrice) 
 VALUES 
 (2, '2025-04-21 22:06:31.5410000', 2, 0, 2500.00),
 (1, '2025-04-22 18:00:00.0000000', 1, 0, 2500.00),
 (3, '2025-04-22 20:00:00.0000000', 3, 0, 2500.00),
 (4, '2025-04-23 17:00:00.0000000', 4, 0, 2500.00),
 (5, '2025-04-23 19:00:00.0000000', 5, 0, 2500.00),
 (6, '2025-04-24 21:00:00.0000000', 6, 0, 2500.00),
 (7, '2025-04-24 18:00:00.0000000', 1, 0, 2500.00),
 (8, '2025-04-25 20:00:00.0000000', 2, 0, 2500.00),
 (9, '2025-04-25 17:00:00.0000000', 3, 0, 2500.00),
 (10, '2025-04-26 19:00:00.0000000', 4, 0, 2500.00),
 (11, '2025-04-26 21:00:00.0000000', 5, 0, 2500.00),
 (12, '2025-04-27 18:00:00.0000000', 6, 0, 2500.00),
 (13, '2025-04-27 20:00:00.0000000', 1, 0, 2500.00),
 (14, '2025-04-28 17:00:00.0000000', 2, 0, 2500.00),
 (15, '2025-04-28 19:00:00.0000000', 3, 0, 2500.00),
 (16, '2025-04-29 21:00:00.0000000', 4, 0, 2500.00),
 (17, '2025-04-29 18:00:00.0000000', 5, 0, 2500.00),
 (18, '2025-04-30 20:00:00.0000000', 6, 0, 2500.00),
 (19, '2025-04-30 17:00:00.0000000', 1, 0, 2500.00),
 (20, '2025-05-01 19:00:00.0000000', 2, 0, 2500.00),
 (21, '2025-05-01 21:00:00.0000000', 3, 0, 2500.00),
 (22, '2025-05-02 18:00:00.0000000', 4, 0, 2500.00),
 (23, '2025-05-02 20:00:00.0000000', 5, 0, 2500.00),
 (24, '2025-05-03 17:00:00.0000000', 6, 0, 2500.00),
 (25, '2025-05-03 19:00:00.0000000', 1, 0, 2500.00),
 (26, '2025-05-04 21:00:00.0000000', 2, 0, 2500.00),
 (27, '2025-05-04 18:00:00.0000000', 3, 0, 2500.00),
 (28, '2025-05-05 20:00:00.0000000', 4, 0, 2500.00),
 (29, '2025-05-05 17:00:00.0000000', 5, 0, 2500.00),
 (30, '2025-05-06 19:00:00.0000000', 6, 0, 2500.00),
 (31, '2025-05-06 21:00:00.0000000', 1, 0, 2500.00),
 (32, '2025-05-07 18:00:00.0000000', 2, 0, 2500.00),
 (33, '2025-05-07 20:00:00.0000000', 3, 0, 2500.00),
 (34, '2025-05-08 17:00:00.0000000', 4, 0, 2500.00),
 (35, '2025-05-08 19:00:00.0000000', 5, 0, 2500.00),
 (36, '2025-05-09 21:00:00.0000000', 6, 0, 2500.00),
 (37, '2025-05-09 18:00:00.0000000', 1, 0, 2500.00),
 (38, '2025-05-10 20:00:00.0000000', 2, 0, 2500.00),
 (39, '2025-05-10 17:00:00.0000000', 3, 0, 2500.00),
 (40, '2025-05-11 19:00:00.0000000', 4, 0, 2500.00),
 (41, '2025-05-11 21:00:00.0000000', 5, 0, 2500.00);
 
 -- Seats (Generated based on Screenings and Rooms)
 INSERT INTO Seats (ScreeningId, [Row], [Column], IsReserved, IsDeleted) 
 VALUES 
 -- Screening 1, Room 2 (4 rows, 5 columns)
 (1, 1, 1, 0, 0), (1, 1, 2, 0, 0), (1, 1, 3, 0, 0), (1, 1, 4, 0, 0), (1, 1, 5, 0, 0),
 (1, 2, 1, 0, 0), (1, 2, 2, 0, 0), (1, 2, 3, 0, 0), (1, 2, 4, 0, 0), (1, 2, 5, 0, 0),
 (1, 3, 1, 0, 0), (1, 3, 2, 0, 0), (1, 3, 3, 0, 0), (1, 3, 4, 0, 0), (1, 3, 5, 0, 0),
 (1, 4, 1, 0, 0), (1, 4, 2, 0, 0), (1, 4, 3, 0, 0), (1, 4, 4, 0, 0), (1, 4, 5, 0, 0),
 -- Screening 2, Room 1 (5 rows, 6 columns)
 (2, 1, 1, 0, 0), (2, 1, 2, 0, 0), (2, 1, 3, 0, 0), (2, 1, 4, 0, 0), (2, 1, 5, 0, 0), (2, 1, 6, 0, 0),
 (2, 2, 1, 0, 0), (2, 2, 2, 0, 0), (2, 2, 3, 0, 0), (2, 2, 4, 0, 0), (2, 2, 5, 0, 0), (2, 2, 6, 0, 0),
 (2, 3, 1, 0, 0), (2, 3, 2, 0, 0), (2, 3, 3, 0, 0), (2, 3, 4, 0, 0), (2, 3, 5, 0, 0), (2, 3, 6, 0, 0),
 (2, 4, 1, 0, 0), (2, 4, 2, 0, 0), (2, 4, 3, 0, 0), (2, 4, 4, 0, 0), (2, 4, 5, 0, 0), (2, 4, 6, 0, 0),
 (2, 5, 1, 0, 0), (2, 5, 2, 0, 0), (2, 5, 3, 0, 0), (2, 5, 4, 0, 0), (2, 5, 5, 0, 0), (2, 5, 6, 0, 0),
 -- Add similar entries for Screenings 3-41 based on their RoomId
 -- Example for Screening 3, Room 3 (6 rows, 7 columns)
 (3, 1, 1, 0, 0), (3, 1, 2, 0, 0), (3, 1, 3, 0, 0), (3, 1, 4, 0, 0), (3, 1, 5, 0, 0), (3, 1, 6, 0, 0), (3, 1, 7, 0, 0),
 (3, 2, 1, 0, 0), (3, 2, 2, 0, 0), (3, 2, 3, 0, 0), (3, 2, 4, 0, 0), (3, 2, 5, 0, 0), (3, 2, 6, 0, 0), (3, 2, 7, 0, 0),
 (3, 3, 1, 0, 0), (3, 3, 2, 0, 0), (3, 3, 3, 0, 0), (3, 3, 4, 0, 0), (3, 3, 5, 0, 0), (3, 3, 6, 0, 0), (3, 3, 7, 0, 0),
 (3, 4, 1, 0, 0), (3, 4, 2, 0, 0), (3, 4, 3, 0, 0), (3, 4, 4, 0, 0), (3, 4, 5, 0, 0), (3, 4, 6, 0, 0), (3, 4, 7, 0, 0),
 (3, 5, 1, 0, 0), (3, 5, 2, 0, 0), (3, 5, 3, 0, 0), (3, 5, 4, 0, 0), (3, 5, 5, 0, 0), (3, 5, 6, 0, 0), (3, 5, 7, 0, 0),
 (3, 6, 1, 0, 0), (3, 6, 2, 0, 0), (3, 6, 3, 0, 0), (3, 6, 4, 0, 0), (3, 6, 5, 0, 0), (3, 6, 6, 0, 0), (3, 6, 7, 0, 0);
 -- Continue for other screenings similarly, matching RoomId dimensions
 
 -- Orders
 INSERT INTO Orders (PurchaseDate, TotalPrice, UserId, IsDeleted, Email, Phone, ScreeningId) 
 VALUES 
 ( '2025-04-21 22:14:52.8963759', 2125.00, 1, 0, 'hugh.jackman@example.com', '06302224567', 2),
 ( '2025-04-22 18:10:00.0000000', 4250.00, 2, 0, 'emma.watson@example.com', '06302224568', 1),
 ( '2025-04-22 20:15:00.0000000', 2125.00, 3, 0, 'chris.hemsworth@example.com', '06302224569', 3),
 ( '2025-04-23 17:20:00.0000000', 6375.00, 4, 0, 'scarlett.johansson@example.com', '06302224570', 4),
 ( '2025-04-23 19:25:00.0000000', 2125.00, 5, 0, 'robert.downey@example.com', '06302224571', 5),
 ( '2025-04-24 21:30:00.0000000', 4250.00, 6, 0, 'natalie.portman@example.com', '06302224572', 6),
 ( '2025-04-24 18:35:00.0000000', 2125.00, 7, 0, 'tom.hanks@example.com', '06302224573', 7),
 ( '2025-04-25 20:40:00.0000000', 6375.00, 8, 0, 'margot.robbie@example.com', '06302224574', 8),
 ( '2025-04-25 17:45:00.0000000', 2125.00, 9, 0, 'ryan.reynolds@example.com', '06302224575', 9),
 ( '2025-04-26 19:50:00.0000000', 4250.00, 10, 0, 'gal.gadot@example.com', '06302224576', 10),
 ( '2025-04-26 21:55:00.0000000', 2125.00, 11, 0, 'leonardo.dicaprio@example.com', '06302224577', 11),
 ( '2025-04-27 18:00:00.0000000', 6375.00, 12, 0, 'zendaya@example.com', '06302224578', 12),
 ( '2025-04-27 20:05:00.0000000', 2125.00, 13, 0, 'brad.pitt@example.com', '06302224579', 13),
 ( '2025-04-28 17:10:00.0000000', 4250.00, 14, 0, 'angelina.jolie@example.com', '06302224580', 14),
 ( '2025-04-28 19:15:00.0000000', 2125.00, 15, 0, 'chris.evans@example.com', '06302224581', 15),
 ( '2025-04-29 21:20:00.0000000', 6375.00, 16, 0, 'anne.hathaway@example.com', '06302224582', 16),
 ( '2025-04-29 18:25:00.0000000', 2125.00, 17, 0, 'dwayne.johnson@example.com', '06302224583', 17),
 ( '2025-04-30 20:30:00.0000000', 4250.00, 18, 0, 'jennifer.lawrence@example.com', '06302224584', 18),
 ( '2025-04-30 17:35:00.0000000', 2125.00, 19, 0, 'keanu.reeves@example.com', '06302224585', 19),
 ( '2025-05-01 19:40:00.0000000', 6375.00, 20, 0, 'tom.cruise@example.com', '06302224586', 20),
 ( '2025-05-01 21:45:00.0000000', 2125.00, 1, 0, 'hugh.jackman@example.com', '06302224567', 21),
 ( '2025-05-02 18:50:00.0000000', 4250.00, 2, 0, 'emma.watson@example.com', '06302224568', 22),
 ( '2025-05-02 20:55:00.0000000', 2125.00, 3, 0, 'chris.hemsworth@example.com', '06302224569', 23),
 ( '2025-05-03 17:00:00.0000000', 6375.00, 4, 0, 'scarlett.johansson@example.com', '06302224570', 24),
 ( '2025-05-03 19:05:00.0000000', 2125.00, 5, 0, 'robert.downey@example.com', '06302224571', 25),
 ( '2025-05-04 21:10:00.0000000', 4250.00, 6, 0, 'natalie.portman@example.com', '06302224572', 26),
 ( '2025-05-04 18:15:00.0000000', 2125.00, 7, 0, 'tom.hanks@example.com', '06302224573', 27),
 ( '2025-05-05 20:20:00.0000000', 6375.00, 8, 0, 'margot.robbie@example.com', '06302224574', 28),
 ( '2025-05-05 17:25:00.0000000', 2125.00, 9, 0, 'ryan.reynolds@example.com', '06302224575', 29),
 ( '2025-05-06 19:30:00.0000000', 4250.00, 10, 0, 'gal.gadot@example.com', '06302224576', 30),
 ( '2025-05-06 21:35:00.0000000', 2125.00, 11, 0, 'leonardo.dicaprio@example.com', '06302224577', 31),
 ( '2025-05-07 18:40:00.0000000', 6375.00, 12, 0, 'zendaya@example.com', '06302224578', 32),
 ( '2025-05-07 20:45:00.0000000', 2125.00, 13, 0, 'brad.pitt@example.com', '06302224579', 33),
 ( '2025-05-08 17:50:00.0000000', 4250.00, 14, 0, 'angelina.jolie@example.com', '06302224580', 34),
 ( '2025-05-08 19:55:00.0000000', 2125.00, 15, 0, 'chris.evans@example.com', '06302224581', 35),
 ( '2025-05-09 21:00:00.0000000', 6375.00, 16, 0, 'anne.hathaway@example.com', '06302224582', 36),
 ( '2025-05-09 18:05:00.0000000', 2125.00, 17, 0, 'dwayne.johnson@example.com', '06302224583', 37),
 ( '2025-05-10 20:10:00.0000000', 4250.00, 18, 0, 'jennifer.lawrence@example.com', '06302224584', 38),
 ( '2025-05-10 17:15:00.0000000', 2125.00, 19, 0, 'keanu.reeves@example.com', '06302224585', 39),
 ( '2025-05-11 19:20:00.0000000', 6375.00, 20, 0, 'tom.cruise@example.com', '06302224586', 40),
 ( '2025-05-11 21:25:00.0000000', 2125.00, 1, 0, 'hugh.jackman@example.com', '06302224567', 41),
 ( '2025-05-12 18:30:00.0000000', 4250.00, 2, 0, 'emma.watson@example.com', '06302224568', 1),
 ( '2025-05-12 20:35:00.0000000', 2125.00, 3, 0, 'chris.hemsworth@example.com', '06302224569', 2),
 ( '2025-05-13 17:40:00.0000000', 6375.00, 4, 0, 'scarlett.johansson@example.com', '06302224570', 3),
 ( '2025-05-13 19:45:00.0000000', 2125.00, 5, 0, 'robert.downey@example.com', '06302224571', 4),
 ( '2025-05-14 21:50:00.0000000', 4250.00, 6, 0, 'natalie.portman@example.com', '06302224572', 5),
 ( '2025-05-14 18:55:00.0000000', 2125.00, 7, 0, 'tom.hanks@example.com', '06302224573', 6),
 ( '2025-05-15 20:00:00.0000000', 6375.00, 8, 0, 'margot.robbie@example.com', '06302224574', 7),
 ( '2025-05-15 17:05:00.0000000', 2125.00, 9, 0, 'ryan.reynolds@example.com', '06302224575', 8),
 ( '2025-05-16 19:10:00.0000000', 4250.00, 10, 0, 'gal.gadot@example.com', '06302224576', 9);
 
 -- Tickets
 INSERT INTO Tickets (Price, [Type], ScreeningId, OrderId, IsDeleted, SeatId) 
 VALUES 
 (2125.00, 2, 2, 1, 0, 3),
 (2125.00, 3, 1, 2, 0, 1),
 (2125.00, 3, 1, 2, 0, 2),
 (2125.00, 4, 3, 3, 0, 4),
 (2125.00, 5, 4, 4, 0, 5),
 (2125.00, 5, 4, 4, 0, 6),
 (2125.00, 5, 4, 4, 0, 7),
 (2125.00, 2, 5, 5, 0, 8),
 (2125.00, 3, 6, 6, 0, 9),
 (2125.00, 3, 6, 6, 0, 10),
 (2125.00, 4, 7, 7, 0, 11),
 (2125.00, 5, 8, 8, 0, 12),
 (2125.00, 5, 8, 8, 0, 13),
 (2125.00, 5, 8, 8, 0, 14),
 (2125.00, 2, 9, 9, 0, 15),
 (2125.00, 3, 10, 10, 0, 16),
 (2125.00, 3, 10, 10, 0, 17),
 (2125.00, 4, 11, 11, 0, 18),
 (2125.00, 5, 12, 12, 0, 19),
 (2125.00, 5, 12, 12, 0, 20),
 (2125.00, 5, 12, 12, 0, 21),
 (2125.00, 2, 13, 13, 0, 22),
 (2125.00, 3, 14, 14, 0, 23),
 (2125.00, 3, 14, 14, 0, 24),
 (2125.00, 4, 15, 15, 0, 25),
 (2125.00, 5, 16, 16, 0, 26),
 (2125.00, 5, 16, 16, 0, 27),
 (2125.00, 5, 16, 16, 0, 28),
 (2125.00, 2, 17, 17, 0, 29),
 (2125.00, 3, 18, 18, 0, 30),
 (2125.00, 3, 18, 18, 0, 31),
 (2125.00, 4, 19, 19, 0, 32),
 (2125.00, 5, 20, 20, 0, 33),
 (2125.00, 5, 20, 20, 0, 34),
 (2125.00, 5, 20, 20, 0, 35),
 (2125.00, 2, 21, 21, 0, 36),
 (2125.00, 3, 22, 22, 0, 37),
 (2125.00, 3, 22, 22, 0, 38),
 (2125.00, 4, 23, 23, 0, 39),
 (2125.00, 5, 24, 24, 0, 40),
 (2125.00, 5, 24, 24, 0, 41),
 (2125.00, 5, 24, 24, 0, 42),
 (2125.00, 2, 25, 25, 0, 43),
 (2125.00, 3, 26, 26, 0, 44),
 (2125.00, 3, 26, 26, 0, 45),
 (2125.00, 4, 27, 27, 0, 46),
 (2125.00, 5, 28, 28, 0, 47),
 (2125.00, 5, 28, 28, 0, 48),
 (2125.00, 5, 28, 28, 0, 49),
 (2125.00, 2, 29, 29, 0, 50),
 (2125.00, 3, 30, 30, 0, 51),
 (2125.00, 3, 30, 30, 0, 52),
 (2125.00, 4, 31, 31, 0, 53),
 (2125.00, 5, 32, 32, 0, 54),
 (2125.00, 5, 32, 32, 0, 55),
 (2125.00, 5, 32, 32, 0, 56),
 (2125.00, 2, 33, 33, 0, 57),
 (2125.00, 3, 34, 34, 0, 58),
 (2125.00, 3, 34, 34, 0, 59),
 (2125.00, 4, 35, 35, 0, 60),
 (2125.00, 5, 36, 36, 0, 61),
 (2125.00, 5, 36, 36, 0, 62),
 (2125.00, 5, 36, 36, 0, 63),
 (2125.00, 2, 37, 37, 0, 64),
 (2125.00, 3, 38, 38, 0, 65),
 (2125.00, 3, 38, 38, 0, 66),
 (2125.00, 4, 39, 39, 0, 67),
 (2125.00, 5, 40, 40, 0, 68),
 (2125.00, 5, 40, 40, 0, 69),
 (2125.00, 5, 40, 40, 0, 70),
 (2125.00, 2, 41, 41, 0, 71);