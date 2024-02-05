import copy
import random
# Consider using the modules imported above.


class Hat:
    def __init__(self, **kwargs):
        self.ball_counts = kwargs
        self.initial_contents = [key for key,
                                 value in kwargs.items() for _ in range(value)]
        self.contents = self.initial_contents[:]

    def draw(self, draws):
        self.contents = self.initial_contents[:]
        draws = min(draws, len(self.contents))

        return [self.contents.pop(random.randrange(len(self.contents))) for _ in range(draws)]


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    successes = 0
    for _ in range(num_experiments):
        if runDraws(hat, expected_balls, num_balls_drawn):
            successes += 1

    return round((successes / num_experiments), 4)


def runDraws(hat, expected_balls, num_balls_drawn):
    draws = {}
    balls = hat.draw(num_balls_drawn)
    for ball in balls:
        if ball not in draws:
            draws[ball] = 0
        draws[ball] += 1

    for key in expected_balls:
        if key not in draws:
            return False
        if draws[key] < expected_balls[key]:
            return False

    return True
